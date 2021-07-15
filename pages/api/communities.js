import { SiteClient } from 'datocms-client';

export default async function communities(request, response) {
    if (request.method === "POST") {
        const token = "15cc151fbc64777757a3fe59f8bf00";

        const client = new SiteClient(token);

        console.log(request.body);

        const record = await client.items.create({
            itemType: "966768",
            ...request.body
        });

        return response.status(201).send({
            data: record
        })
    }

    return response.status(405).send({ error: "Method get is not allowed" });
}