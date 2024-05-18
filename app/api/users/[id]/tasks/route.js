import clientPromise from "@/utils/mongodb"
import { ObjectId } from "mongodb";

export const PATCH = async (request, { params }) => {
    try {
        const db = await clientPromise;
        const collection = db.db("test").collection('users');

        //Get the user info

        var o_id = new ObjectId(params.id);

        const user = await collection.find({ _id: o_id }).toArray().then((data) => {
            return data[0]
        });

        if (!user) {
            return new Response("User not found", { status: 404 })
        }

        //Update the user info
        const body = await request.json()
        const { id } = body;
        
        //update user list of tasks on index id
        if(user.links_status[id] === "completed"){
            user.links_status[id] = "pending";
        }
        else{
            user.links_status[id] = "completed";
        }

        //update the user in the database
        const updatedUser = await collection.findOneAndUpdate(
            { _id: o_id },
            { $set: { links_status: user.links_status } },
            { returnDocument: 'after' }
        ).then((data) => {
            return data.value
        });
        

        return new Response(JSON.stringify(updatedUser), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
}