export async function fetchPromInfo() {
    const res = await fetch(
        `https://kenkoooo.com/atcoder/resources/problems.json`
    );

    return await res.json();
}

export async function fetchPromDiff() {
    const res =  await fetch(
        `https://kenkoooo.com/atcoder/resources/problem-models.json`
    );

    return await res.json();
}

export async function fetchUesrsSub(user_id) {
    console.log(user_id);
    const res = await fetch(
        `https://kenkoooo.com/atcoder/atcoder-api/results?user=${user_id}`
    );
    return await res.json();
}