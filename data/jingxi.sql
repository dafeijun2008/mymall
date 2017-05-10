SET NAMES 'utf8';
DROP DATABASE IF EXISTS jingxi;
CREATE DATABASE jingxi CHARSET=UTF8;
USE jingxi;
CREATE TABLE  jx_product(
	pid INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(64),
	price FLOAT(6,2),
	img1 VARCHAR(64),
	img2 VARCHAR(64),
	img3 VARCHAR(64),
	img4 VARCHAR(64),
	img5 VARCHAR(64),
	detail VARCHAR(2048)
);
INSERT INTO jx_product(pid,name,price,img1,img2,img3,img4,img5,detail) VALUES
(null,'欧狄蕾套装裙','299.00','1 (4).jpg','1 (5).jpg','1 (6).jpg','1 (7).jpg','1 (8).jpg','欧狄蕾2017春装新款女装西装翻领单排扣中长款PU皮衣外套女春秋 '),
(null,'印花连衣裙','199.00','1 (22).jpg','1 (10).jpg','1 (11).jpg','1 (12).jpg','1 (13).jpg','2017春装新品长袖毛呢A字印花连衣裙韩版修身加厚打底裙冬裙子'),
(null,'收腰长袖连衣裙','288.00','1 (13).jpg','1 (14).jpg','1 (15).jpg','1 (16).jpg','1 (17).jpg','欧狄蕾套装裙2016秋装新款女装中裙韩版收腰长袖连衣裙马甲两件套'),
(null,'长袖V领连衣裙','180.00','1 (18).jpg','1 (9).jpg','1 (20).jpg','1 (21).jpg','1 (22).jpg','欧狄蕾2017春装新款女装长袖V领连衣裙蕾丝修身显瘦包臀裙打底裙 '),
(null,'轻薄羽绒棉服','299.00','1 (8).jpg','1 (22).jpg','1 (23).jpg','1 (24).jpg','1 (25).jpg','欧狄蕾棉衣女中长款2016冬装新款显瘦棉袄立领轻薄羽绒棉服外套女'),
(null,'大衣女式西装外套','129.00','1 (33).jpg','1 (25).jpg','1 (26).jpg','1 (27).jpg','1 (28).jpg','毛呢外套女中长款2017春装新品女装韩版修身呢子大衣女式西装外套 '),
(null,'大衣女式西装外套','299.00','1 (35).jpg','1 (34).jpg','1 (33).jpg','1 (32).jpg','1 (31).jpg','毛呢外套女中长款2017春装新品女装韩版修身呢子大衣女式西装外套  '),
(null,'PU皮衣外套女春秋','199.00','1 (11).jpg','1 (36).jpg','1 (38).jpg','1 (37).jpg','1 (39).jpg','欧狄蕾2017春装新款女装复古民族风印花打底裙韩版春秋长袖连衣裙'),
(null,'印花连衣裙','199.00','1 (40).jpg','1 (44).jpg','1 (41).jpg','1 (42).jpg','1 (43).jpg','2017春装新品长袖毛呢A字印花连衣裙韩版修身加厚打底裙冬裙子'),
(null,'欧狄蕾套装裙','299.00','1 (4).jpg','1 (5).jpg','1 (6).jpg','1 (7).jpg','1 (8).jpg','欧狄蕾2017春装新款女装西装翻领单排扣中长款PU皮衣外套女春秋 '),
(null,'印花连衣裙','199.00','1 (11).jpg','1 (10).jpg','1 (11).jpg','1 (12).jpg','1 (13).jpg','2017春装新品长袖毛呢A字印花连衣裙韩版修身加厚打底裙冬裙子'),
(null,'收腰长袖连衣裙','288.00','1 (13).jpg','1 (14).jpg','1 (15).jpg','1 (16).jpg','1 (17).jpg','欧狄蕾套装裙2016秋装新款女装中裙韩版收腰长袖连衣裙马甲两件套'),
(null,'印花连衣裙','199.00','1 (42).jpg','1 (44).jpg','1 (41).jpg','1 (42).jpg','1 (43).jpg','2017春装新品长袖毛呢A字印花连衣裙韩版修身加厚打底裙冬裙子'),
(null,'长袖V领连衣裙','180.00','1 (18).jpg','1 (9).jpg','1 (20).jpg','1 (21).jpg','1 (22).jpg','欧狄蕾2017春装新款女装长袖V领连衣裙蕾丝修身显瘦包臀裙打底裙 '),
(null,'轻薄羽绒棉服','299.00','1 (8).jpg','1 (22).jpg','1 (23).jpg','1 (24).jpg','1 (25).jpg','欧狄蕾棉衣女中长款2016冬装新款显瘦棉袄立领轻薄羽绒棉服外套女'),
(null,'大衣女式西装外套','129.00','1 (9).jpg','1 (25).jpg','1 (26).jpg','1 (27).jpg','1 (28).jpg','毛呢外套女中长款2017春装新品女装韩版修身呢子大衣女式西装外套 '),
(null,'大衣女式西装外套','299.00','1 (35).jpg','1 (34).jpg','1 (33).jpg','1 (32).jpg','1 (31).jpg','毛呢外套女中长款2017春装新品女装韩版修身呢子大衣女式西装外套  '),
(null,'PU皮衣外套女春秋','199.00','1 (11).jpg','1 (36).jpg','1 (38).jpg','1 (37).jpg','1 (39).jpg','欧狄蕾2017春装新款女装复古民族风印花打底裙韩版春秋长袖连衣裙'),
(null,'印花连衣裙','199.00','1 (40).jpg','1 (44).jpg','1 (41).jpg','1 (42).jpg','1 (43).jpg','2017春装新品长袖毛呢A字印花连衣裙韩版修身加厚打底裙冬裙子'),
(null,'欧狄蕾套装裙','299.00','1 (4).jpg','1 (5).jpg','1 (6).jpg','1 (7).jpg','1 (8).jpg','欧狄蕾2017春装新款女装西装翻领单排扣中长款PU皮衣外套女春秋 '),
(null,'印花连衣裙','199.00','1 (9).jpg','1 (10).jpg','1 (11).jpg','1 (12).jpg','1 (13).jpg','2017春装新品长袖毛呢A字印花连衣裙韩版修身加厚打底裙冬裙子'),
(null,'收腰长袖连衣裙','288.00','1 (13).jpg','1 (14).jpg','1 (15).jpg','1 (16).jpg','1 (17).jpg','欧狄蕾套装裙2016秋装新款女装中裙韩版收腰长袖连衣裙马甲两件套'),
(null,'长袖V领连衣裙','180.00','1 (18).jpg','1 (9).jpg','1 (20).jpg','1 (21).jpg','1 (22).jpg','欧狄蕾2017春装新款女装长袖V领连衣裙蕾丝修身显瘦包臀裙打底裙 '),
(null,'轻薄羽绒棉服','299.00','1 (8).jpg','1 (22).jpg','1 (23).jpg','1 (24).jpg','1 (25).jpg','欧狄蕾棉衣女中长款2016冬装新款显瘦棉袄立领轻薄羽绒棉服外套女'),
(null,'大衣女式西装外套','129.00','1 (9).jpg','1 (25).jpg','1 (26).jpg','1 (27).jpg','1 (28).jpg','毛呢外套女中长款2017春装新品女装韩版修身呢子大衣女式西装外套 '),
(null,'大衣女式西装外套','299.00','1 (35).jpg','1 (34).jpg','1 (33).jpg','1 (32).jpg','1 (31).jpg','毛呢外套女中长款2017春装新品女装韩版修身呢子大衣女式西装外套  '),
(null,'PU皮衣外套女春秋','199.00','1 (11).jpg','1 (36).jpg','1 (38).jpg','1 (37).jpg','1 (39).jpg','欧狄蕾2017春装新款女装复古民族风印花打底裙韩版春秋长袖连衣裙'),
(null,'印花连衣裙','199.00','1 (29).jpg','1 (44).jpg','1 (41).jpg','1 (42).jpg','1 (43).jpg','2017春装新品长袖毛呢A字印花连衣裙韩版修身加厚打底裙冬裙子');

CREATE TABLE jingxi_user(
	uid int primary key auto_increment,
	uname varchar(32),
	upwd varchar(32)
);
insert into jingxi_user values(null,'liguoye','123456');
insert into jingxi_user values(null,'laowang','123456');
CREATE TABLE jingxi_cart(
	cid int primary key auto_increment,
	userId int
);
INSERT INTO jingxi_cart VALUES(null,1);
INSERT INTO jingxi_cart VALUES(null,2);
CREATE TABLE jingxi_cart_detail(
	did int primary key auto_increment,
	productId int,
	cartId int,
	count int
);
CREATE TABLE jingxi_order(
    oid INT PRIMARY KEY AUTO_INCREMENT,     /*订单ID*/
    userid INT,                               /*用户*/
    phone VARCHAR(16),                       /*联系电话*/
    user_name VARCHAR(16),                   /*收货方用户名*/
    order_time LONG,                          /*下单时间*/
    addr VARCHAR(256),                       /*订单地址*/
    totalprice FLOAT(6,2),                   /*订单总价*/
    sex  VARCHAR(10)
);
CREATE TABLE  jingxi_order_detail(
did       int primary key auto_increment,
orderId   int not null default 0,
productId int not null default 0,
count     int not null default 0
);