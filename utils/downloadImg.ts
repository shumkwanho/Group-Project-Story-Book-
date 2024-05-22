import fs from "fs"
import client from "https"
import path from "path";


export function downloadImage(url: string) {
    const filename = newFilename()

    const filepath = path.resolve(__dirname, `../uploads/characterImg/${filename}`)
    return new Promise((resolve, reject) => {

      client.get(url, (res) => {
            if (res.statusCode === 200) {
                res.pipe(fs.createWriteStream(filepath))
                    .on('error', reject)
                    .once('close', () => resolve(filename));
     
            } else {
                // Consume response data to free up memory
                res.resume();
                reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));

            }
        });


    });

}

function newFilename() {
    let now = new Date()
    let newFilename = now.getTime() + ".jpeg"
    return newFilename
}

