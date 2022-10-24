/*
This is an example snippet - you should consider tailoring it
to your service.
*/

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
  console.log(response.data.users.length === 0, issuer);
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
