type WorkflowPageProps = {
  params: { workflowId: string }
}

export default function WorkflowByIdPage({ params }: WorkflowPageProps) {
  const { workflowId } = params

  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">{workflowId}</p>
    </div>
  )
}
