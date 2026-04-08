import { Router } from "express"
import { authMiddleware } from "../middlewares/auth.middlewares.js"
import { s3Service } from "../services/s3.services.js"
import { postgresService } from "../services/postgres.services.js"
import logger from "../logger/winston.logger.js"

const router: Router = Router()

/**
 * Request Presigned Upload URL for Profile Image
 * 
 * Generates a secure PUT URL for direct client-side S3/R2 upload.
 */
router.post("/upload-url", authMiddleware, async (req: any, res) => {
  const { contentType, extension } = req.body
  const userId = req.user.id

  if (!contentType || !extension) {
    return res.status(400).json({ success: false, message: "Invalid payload: contentType and extension required." })
  }

  try {
    const path = `avatars/${userId}/${Date.now()}.${extension}`
    const uploadUrl = await s3Service.getPresignedUploadUrl(path, contentType)

    res.json({
      success: true,
      uploadUrl,
      path,
    })
  } catch (error: any) {
    logger.error(`[UserRoutes] Presigned URL generation failed: ${error.message}`)
    res.status(500).json({ success: false, message: "Failed to generate upload credentials." })
  }
})

/**
 * Update User Profile
 * 
 * Persists user metadata changes (name, image URL) to the PostgreSQL database.
 */
router.patch("/profile", authMiddleware, async (req: any, res) => {
  const { name, image } = req.body
  const userId = req.user.id

  try {
    const updatedUser = await postgresService.updateUser(userId, { name, image })
    
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "Node Identity not found." })
    }

    res.json({
      success: true,
      message: "Sync_Identity_Protocol_Complete",
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        image: updatedUser.image,
        emailVerified: updatedUser.emailVerified,
      },
    })
  } catch (error: any) {
    logger.error(`[UserRoutes] Profile update failed: ${error.message}`)
    res.status(500).json({ success: false, message: "Sync_Identity_Protocol_Error" })
  }
})

export default router
