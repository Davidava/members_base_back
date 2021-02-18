const boom = require('boom');
const cloudinary = require("../utils/cloudinary");

const genericCrud = (model) => ({
    async get({ params: { id } }, res) {
        try {
            const item = await model.findById(id)
            return res.status(200).send(item)
        } catch (err) {
            return res.status(400).send(boom.boomify(err))
        }
    },
    async getAll({params: { page } }, res) {
        try {
            console.log(page)
            await model.paginate({}, { limit: 10, page: page }).then(function (result) {
                return res.status(200).send(result)
            })
    } catch (err) {
        return res.status(400).send(boom.boomify(err))
    }},
    async create(req, res) {
        try {
            const item = new model(req.body)
            if(req.file) {
                const itemImage = await cloudinary.uploader.upload(req.file.path);
                item.avatar = itemImage.secure_url;
                item.cloudinary_id = itemImage.public_id;
            };
            const newItem = await item.save();
            return res.status(200).send(newItem);
          } catch (err) {
            return res.status(400).send(boom.boomify(err));
          }
    },
    async update(req, res) {
        try {
            console.log(req.body)
            const member = await model.findById(req.params.id);
            const data = Object.assign({},req.body);
            // Delete and Upload image cloudinary
            if(req.file) {
                if(member.cloudinary_id) {
                    await cloudinary.uploader.destroy(member.cloudinary_id);
                }
                const result = await cloudinary.uploader.upload(req.file.path);
                data.avatar = result.secure_url;
                data.cloudinary_id = result.public_id;
            }
            const item = await model.findByIdAndUpdate(req.params.id, data, { new:true })
            return res.status(200).send(item)
        } catch (err) {
            return res.status(400).send(boom.boomify(err))
        }
    },
    async delete({params: { id } }, res) {
        try {
            const item = await model.findById(id)
            if (item.cloudinary_id) {
                await cloudinary.uploader.destroy(item.cloudinary_id);
              }
            await model.findByIdAndDelete(id);
            return res.status(200).send({status: "Ok", messege: "Член удален"})
        } catch (err) {
            return res.status(400).send(boom.boomify(err))
        }
    },
    async search({params: { text } }, res) {
        try {
            items = await model.search(text)
            return res.status(200).send(items)
        } catch (err) {
            return res.status(400).send(boom.boomify(err))
        }
    }
})

module.exports = genericCrud