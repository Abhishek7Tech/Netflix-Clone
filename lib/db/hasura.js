/*
This is an example snippet - you should consider tailoring it
to your service.
*/

export async function getMyList(token,userId) {
  const operationsDoc = `
  query favouritedVideos($userId: String!) {
    stats(where: {
      userId: {_eq: $userId}, 
      favourited: {_eq: 1}
    }) {
      videoId
    }
  }
  `;

  const response = await queryHasuraGraphQL(
    operationsDoc,
    "favouritedVideos",
    {userId},
    token
  )

  return response?.data.stats;
}


export async function getWatchedVideos(token,userId) {
  const operationsDoc = `
  query watchedVideos($userId: String!) {
    stats(where: {
      watched: {_eq: true}, 
      userId: {_eq: $userId},
    }) {
      videoId
    }
  }
  `;

  const response = await queryHasuraGraphQL(
    operationsDoc,
    "watchedVideos",
    {userId},
    token
  )

  return response?.data.stats;
}




export async function insertStats(
  token,
  { favourited, userId, watched, videoId }
) {
  const operationsDoc = `
  mutation insertStats($favourited: Int!, $userId: String!, $watched: Boolean!, $videoId: String!) {
    insert_stats_one(object: {
      favourited: $favourited, 
      userId: $userId, 
      watched: $watched, 
      videoId: $videoId
    }) {
        favourited
        userId
    }
  }
`;

  const response = queryHasuraGraphQL(
    operationsDoc,
    "insertStats",
    { favourited, userId, watched, videoId },
    token
  );
  return response;
}

export async function updateStats(
  token,
  { favourited, userId, watched, videoId }
) {
  const operationsDoc = `
  mutation updateStats($favourited: Int!, $userId: String!, $watched: Boolean!, $videoId: String!) {
    update_stats(
      _set: {watched: $watched, favourited: $favourited}, 
      where: {
        userId: {_eq: $userId}, 
        videoId: {_eq: $videoId}
      }) {
      returning {
        favourited,
        userId,
        watched,
        videoId
      }
    }
  }
  `;

  const response = await queryHasuraGraphQL(
    operationsDoc,
    "updateStats",
    { favourited, userId, watched, videoId },
    token
  );

  return response;
}

export async function findVideoByUserId(token, userId, videoId) {
  const operationsDoc = `
  query findVIdeoByUserId($userId: String!, $videoId: String!) {
    stats(where: {userId: {_eq: $userId}, videoId: {_eq: $videoId}}) 
     {
      id
      userId
      videoId
      favourited
      watched
    }
  }
  `;

  const response = await queryHasuraGraphQL(
    operationsDoc,
    "findVIdeoByUserId",
    { userId, videoId },
    token
  );
  return response;
}

export async function createNewUser(token, metaData) {
  const operationsDoc = `
  mutation createNewUser($issuer: String!, $email: String!, $publicAddress: String!) {
    insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
      returning {
        email
        id
        issuer
      }
    }
  } 
  `;
  const { email, issuer, publicAddress } = metaData;

  const response = await queryHasuraGraphQL(
    operationsDoc,
    "createNewUser",
    { email, issuer, publicAddress },
    token
  );
  return response;
}

export async function isNewUser(token, issuer) {
  const operationsDoc = `
  query isNewUser($issuer:String!){
    users(where: {issuer:{
      _eq: $issuer
    }}) {
      id
      email
      issuer
    }
  }
  `;

  const response = await queryHasuraGraphQL(
    operationsDoc,
    "isNewUser",
    { issuer },
    token
  );
  return response.data.users.length === 0;
}

export async function queryHasuraGraphQL(
  operationsDoc,
  operationName,
  variables,
  token
) {
  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });

  return await result.json();
}



// const operationsDoc = `
//   query Stats {
//     stats {
//       favourited
//       id
//       userId
//       videoId
//       watched
//     }
//   }
// `;

//   function fetchStats() {
//     return fetchGraphQL(
//       operationsDoc,
//       "Stats",
//       {}
//     );
//   }

//  export async function startFetchStats() {
//     const { errors, data } = await fetchStats();

//     if (errors) {
//       // handle those errors like a pro
//       console.error(errors);
//     }

//     // do something great with this precious data
//     console.log(data);
//   }
