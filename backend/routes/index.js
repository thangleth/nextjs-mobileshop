const express = require('express');
var router = express.Router();
router.use(express.json()); // Để phân tích dữ liệu JSON
router.use(express.urlencoded({ extended: true }));

//Imort model
const connectDb = require('../model/db');
const { ObjectId } = require('mongodb');

router.get('/category', async (req, res, next) => {
  const db = await connectDb();
  const categoryCollection = db.collection('category');
  const category = await categoryCollection.find().toArray();
  if (category) {
    res.status(200).json(category);
  } else {
    res.status(404).json({ message: "Không tìm thấy" })
  }
});

//Lấy tất cả sản phẩm dạng json
router.get('/products', async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection('products');
  const products = await productCollection.find().toArray();
  if (products) {
    res.status(200).json(products);
  } else {
    res.status(404).json({ message: "Không tìm thấy" })
  }
});

// Lấy danh sách sản phẩm theo idcate
//lấy chi tiết 1 sản phẩm
router.get('/productdetail/:id', async (req, res, next) => {
  let id = new ObjectId(req.params.id);
  const db = await connectDb();
  const productCollection = db.collection('products');
  const product = await productCollection.findOne({ _id: id });
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: "Không tìm thấy" })
  }
}
);

router.get('/search/:keyword', async (req, res, next) => {
  try {
    const db = await connectDb();
    const productCollection = db.collection('products');
    const products = await productCollection.find({ name: new RegExp(req.params.keyword, 'i') }).toArray();

    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }
  } catch (error) {
    next(error); // Gọi middleware xử lý lỗi của Express
  }
});

router.get('/hot', async (req, res, next) => {
  try {
    const db = await connectDb();
    const productCollection = db.collection('products');
    const products = await productCollection.find({ hot: true }).toArray();

    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }
  } catch (error) {
    next(error); // Gọi middleware xử lý lỗi của Express
  }
});

const multer = require('multer');
//Thiết lập nơi lưu trữ và tên file
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/img')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
//Kiểm tra file upload
function checkFileUpLoad(req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Bạn chỉ được upload file ảnh'));
  }
  cb(null, true);
}
//Upload file
let upload = multer({ storage: storage, fileFilter: checkFileUpLoad });

//Thêm sản phẩm
router.post('/addproduct', upload.single('image'), async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection('products');
  const { name, price, description, categoryId } = req.body;
  const image = req.file.originalname;
  const newProduct = { name, price, description, categoryId, image };

  try {
    const result = await productCollection.insertOne(newProduct);
    // Check if insertedId exists (indicates successful insertion)
    if (result.insertedId) {
      res.status(200).json({ message: "Thêm sản phẩm thành công" });
    } else {
      res.status(500).json({ message: "Thêm sản phẩm thất bại" }); // Consider using 500 for unexpected errors
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" }); // Generic error message for user
  }
});

// Xóa sản phẩm
router.delete('/deleteproduct/:id', async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection('products');
  const id = new ObjectId(req.params.id);
  try {
    const result = await productCollection.deleteOne({ _id: id });
    if (result.deletedCount) {
      res.status(200).json({ message: "Xóa sản phẩm thành công" });
    } else {
      res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
  }
});

//Sửa sản phẩm
router.put('/updateproduct/:id', upload.single('image'), async (req, res, next) => {
  const db = await connectDb();
  const productCollection = db.collection('products');
  const id = new ObjectId(req.params.id);
  const { name, price, description, categoryId } = req.body;
  let updatedProduct = { name, price, description, categoryId };

  if (req.file) {
    const image = req.file.originalname;
    updatedProduct.image = image; //
  }

  try {
    const result = await productCollection.updateOne({ _id: id }, { $set: updatedProduct });
    if (result.matchedCount) {
      res.status(200).json({ message: "Sửa sản phẩm thành công" });
    } else {
      res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
  }
});

router.delete('/deleteCategory/:id', async (req, res, next) => {
  const db = await connectDb();
  const categoryCollection = db.collection('category');
  const id = new ObjectId(req.params.id);
  try {
    const result = await categoryCollection.deleteOne({ _id: id });
    if (result.deletedCount) {
      res.status(200).json({ message: "Xóa danh mục thành công" });
    } else {
      res.status(404).json({ message: "Không tìm thấy danh mục" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
  }
});

router.get('/category/:id', async (req, res, next) => {
  let id = new ObjectId(req.params.id);
  const db = await connectDb();
  const categoryCollection = db.collection('category');
  const category = await categoryCollection.findOne({ _id: id });
  if (category) {
    res.status(200).json(category);
  } else {
    res.status(404).json({ message: "Không tìm thấy" })
  }
}
);

router.put('/updateCategory/:id', upload.single('image'), async (req, res, next) => {
  const db = await connectDb();
  const categoryCollection = db.collection('category');
  const id = new ObjectId(req.params.id);
  const { name } = req.body;
  let updatedCategory = { name };

  try {
    const result = await categoryCollection.updateOne({ _id: id }, { $set: updatedCategory });
    if (result.matchedCount) {
      res.status(200).json({ message: "Sửa danh muc thành công" });
    } else {
      res.status(404).json({ message: "Không tìm thấy danh muc" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
  }
});

router.post('/addCategory', upload.single('image'), async (req, res, next) => {
  const db = await connectDb();
  const categoryCollection = db.collection('category');
  const { name } = req.body;
  const newCategory = { name };

  try {
    const result = await categoryCollection.insertOne(newCategory);
    // Check if insertedId exists (indicates successful insertion)
    if (result.insertedId) {
      res.status(200).json({ message: "Thêm danh mục thành công" });
    } else {
      res.status(500).json({ message: "Thêm danh mục thất bại" }); // Consider using 500 for unexpected errors
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" }); // Generic error message for user
  }
});


const bcrypt = require('bcryptjs');
router.post('/register', async (req, res, next) => {
  const db = await connectDb();
  const userCollection = db.collection('users');
  const { email, password } = req.body;

  const user = await userCollection.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "Email đã tồn tại" });
  } else {
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = { email, password: hashPassword, role: 'user' };

    try {
      const result = await userCollection.insertOne(newUser);
      if (result.insertedId) {
        res.status(200).json({ message: "Đăng ký thành công" });
      } else {
        res.status(500).json({ message: "Đăng ký thất bại" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Có lỗi xảy ra, vui lòng thử lại" });
    }
  }

});



module.exports = router;
