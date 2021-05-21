var express = require("express");
var router = express.Router();
var luxon = require("luxon");
var Articles = require("../data/articles");

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { articles: Articles, DateTime: luxon.DateTime, root: '/views/' });
});

/* GET view article. */
router.get("/articles/:id", function (req, res, next) {
    res.render("article/show", { article: Articles.find((a) => a.id == req.params.id), DateTime: luxon.DateTime, root: '/home/andrew/Documents/lit-router/views' });
});

/* GET list articles. */
router.get("/articles", function (req, res, next) {
    res.render("article/list", { articles: Articles, DateTime: luxon.DateTime, root: '/home/andrew/Documents/lit-router/views' });
});


module.exports = router;
