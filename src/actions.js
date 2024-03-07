import { HttpError } from 'wasp/server'

export const createIssue = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };
  const newIssue = await context.entities.Issue.create({
    data: {
      title: args.title,
      description: args.description,
      priority: args.priority,
      assigneeId: args.assigneeId
    }
  });
  return newIssue;
}

export const createComment = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const newComment = await context.entities.Comment.create({
    data: {
      issue: { connect: { id: args.issueId } },
      user: { connect: { id: args.userId } },
      commentText: args.commentText
    }
  });

  return newComment;
}

export const uploadAttachment = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const { issueId, file, userId } = args;

  const newAttachment = await context.entities.Attachment.create({
    data: {
      issue: { connect: { id: issueId } },
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      uploadedBy: { connect: { id: userId } }
    }
  });

  return newAttachment;
}

export const manageUser = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const managedUser = await context.entities.User.update({
    where: { id: args.userId },
    data: { role: args.role, active: args.active }
  });

  return managedUser;
}