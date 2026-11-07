import { handleRepositories } from '../../server/github-repos.js';

export function onRequest(context) {
  return handleRepositories(context.request, context.env, context);
}
