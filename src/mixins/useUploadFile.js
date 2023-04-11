import axios from "axios";


export default function() {

    const onUploadImg = async(files, callback) => {
        const res = await Promise.all(
            files.map((file) => {
                return new Promise((rev, rej) => {
                    const form = new FormData();
                    form.append("file", file);

                    axios
                        .post("/dev-api/api/upload", form, {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        })
                        .then((res) => rev(res))
                        .catch((error) => rej(error));
                });
            })
        );

        callback(
            res.map((item) => {

                return item.data.data;
            })
        );
    }

    return {
        onUploadImg
    }
}