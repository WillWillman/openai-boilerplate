import OpenAI from 'openai';

const {
    SHOW_PREVIEW = 'true',
    OPENAI_API_KEY,
    OPENAI_API_ORGANIZATION,
} = process.env

new OpenAI({
    apiKey: OPENAI_API_KEY,
    organization: OPENAI_API_ORGANIZATION,
})
    .models
    .list()
    .then(({ data }) => data)
    .then(data => data.map(({ id, created }) => ({ id, created })))
    .then(data => data.filter(({ id }) => !id.match(/\d{3}/g)))
    .then(data => SHOW_PREVIEW === 'false' ? data.filter(({ id }) => !id.match(/preview/)) : data)
    .then(data => data.sort((a, b) => b.created - a.created))
    .then(data => {
        const cutoff = data.find(data => data.id === 'chatgpt-4o-latest') || { created: 0 };
        return data.filter(data => data.created >= cutoff.created);
    })
    .then(data => data.map(({ id }) => id))
    .then(console.log)
