const Category = require("../models/category.model");
const SubCategory = require("../models/subcategory.model");

class LookupController {
  async createCategory(req, res) {
    try {
      const data = await Category.create(req.body);
      return res.status(200).json({
        message: "Category created successfully",
        data: data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getCategory(req, res) {
    try {
      const data = await Category.find();
      return res.status(200).json({
        message: "get all Category",
        data: data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async createsubCategory(req, res) {
    try {
      const data = await SubCategory.create(req.body);
      return res.status(200).json({
        message: "SubCategory created successfully",
        data: data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getsubCategory(req, res) {
    try {
      const subData = await SubCategory.aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "categoryId",
            foreignField: "_id",
            as: "category",
          },
        },

       {
          $unwind: "$category",
        },
         {
          $project: {
            _id: 1,
            subCategoryName: 1,
            category: {
              _id: 1,
              categoryName: 1,
            },
          },
        },

        // {
        //     $group:{
        //         _id:"$subCategoryName",
        //         subCategoryName:{$first:"$subCategoryName"},
        //         categoryName:{$first:"$category.categoryName"},
        //     }
        // }

        {
          $group: {
            _id: "$category.categoryName",
            subCategories: {
              $push: {
                subCategoryName: "$subCategoryName",
                categoryName: "$category.categoryName",
              },
            },
            total: {
              $sum: 1,
            },
          },
        },
      ]);

      return res.status(200).json({
        message: "SubCategory get successfully",
        data: subData,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new LookupController();
