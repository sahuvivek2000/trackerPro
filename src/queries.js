import { HttpError } from 'wasp/server'

export const getIssues = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }
  return context.entities.Issue.findMany({
    where: {
      status: args.status,
      priority: args.priority,
      assigneeId: args.assigneeId
    }
  });
}

export const getIssueDetails = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const { issueId } = args;

  const issue = await context.entities.Issue.findUnique({
    where: { id: issueId },
    include: {
      comments: true,
      attachments: true
    }
  });

  if (!issue) { throw new HttpError(404, `No issue found with id: ${issueId}`) }

  return issue;
}

export const getAnalytics = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  // Implement analytics data fetching based on provided filters
}