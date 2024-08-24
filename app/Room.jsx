// add users to comments: https://liveblocks.io/docs/guides/how-to-add-users-to-liveblocks-comments

"use client";

import { db } from "@/config/firebaseConfig";
import {
	LiveblocksProvider,
	RoomProvider,
	ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { collection, getDocs, query, where } from "firebase/firestore";

export function Room({ children, params }) {
	return (
		<LiveblocksProvider
			authEndpoint="/api/liveblocks-auth"
			resolveUsers={async ({ userIds }) => {
				// console.log(userIds);		// prints users who commented on that  document
				const q = query(collection(db, 'LoopUsers'), where('email', 'in', userIds))
				const querySnapshot = await getDocs(q);
				const userList = [];
				querySnapshot.forEach((doc) => {
					// console.log(doc.data());
					userList.push(doc.data());
				})

				// Return a list of users
				return userList
			}}

			// showing mentions inside the comments
			resolveMentionSuggestions={async ({ text, roomId }) => {
				// The text the user is searching for after @ symbol, e.g. "mar"
				// console.log(text);

				const q = query(collection(db, 'LoopUsers'), where('email', '!=', null))
				const querySnapshot = await getDocs(q);
				let userList = [];
				querySnapshot.forEach((doc) => {
					userList.push(doc.data());
				})

				// If there's a query, filter for the relevant users
				if (text) {
					// Filter any way you'd like, e.g. checking if the name matches
					userList = userList.filter((user) => user.name.includes(text));
				}

				// Return a list of user email that match the query
				// Return the filtered `userEmails`
				return userList.map((user) => user.email);
			}}
		>
			{/* room id will be documentid */}
			<RoomProvider id={params?.documentid}>
				<ClientSideSuspense fallback={<div>Loading…</div>}>
					{children}
				</ClientSideSuspense>
			</RoomProvider>
		</LiveblocksProvider>
	);
}