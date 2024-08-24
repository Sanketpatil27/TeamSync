// all code from liveblocks
// reference: https://liveblocks.io/docs/get-started/nextjs-comments
// we authenticate user using access tokens inside liveblocks guide
// Set up access token permissions with Next.js: https://liveblocks.io/docs/authentication/access-token/nextjs

import { currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCK_SK,
});

export async function POST(request) {
  // Get the current user from your database/clerk provider
  const user = await currentUser();

  // Start an auth session inside your endpoint
  const session = liveblocks.prepareSession(
    user?.primaryEmailAddress?.emailAddress,    // providing emain address as id
  );

  // giving access to all rooms, so get room id 
  const { room } = await request.json();
  session.allow(room, session?.FULL_ACCESS);

  // Authorize the user and return the result
  const { status, body } = await session.authorize();
  return new Response(body, { status });
}