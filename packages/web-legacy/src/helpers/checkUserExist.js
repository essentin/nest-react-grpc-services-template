import fetch from '../core/fetch';

export async function checkUserExist(email) {
    let query = `query CheckUserExist($email: String!){
        checkUserExist(email: $email){
        status
        }
    }`;

    const resp = await fetch('/graphql', {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: query,
            variables: {
                email
            },
        }),
        credentials: 'include',
    });

    const { data } = await resp.json();
    return await data.checkUserExist && data.checkUserExist && data.checkUserExist.status === 200 ? true : false;
}