const Product = require('../models/Product');
const Category = require('../models/Category');

exports.createProduct = async (req, res) => {
    try {
  const product = await Product.create(req.body);
    res.status(201).json({
      status: 'success',
      product,
    });
  } catch(error) {
    res.status(400).json({
      status: 'failed',
      error,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const categorySlug = req.query.categories;
    const query = req.query.search;

    const category = await Category.findOne({ slug: categorySlug });

    let filter = {};

    if (categorySlug) {
      filter = { category: category._id };
    }

    if (query) {
      filter = { name: query };
    }

    if (!query && !categorySlug) {
      (filter.name = ''), (filter.category = null);
    }

    const products = await Product.find({
      $or: [
        { name: { $regex: '.*' + filter.name + '.*', $options: 'i' } },
        { category: filter.category },
      ],
    })
      .sort('-createdAt')
      

    const categories = await Category.find();

    res.status(200).render('products', {
      products,
      categories,
      page_name: 'products',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
    //const categories = await Category.find();

    res.status(200).render('product', {
      product,
      page_name: 'products',
      //categories,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
