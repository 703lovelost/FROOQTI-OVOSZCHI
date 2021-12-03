const mysql = require("mysql2"),
      express = require("express"),
      bodyParser = require("body-parser"),
      popup = require("node-popup"),
      session = require("express-session"),
      cookieParser = require("cookie-parser"),
      app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.static('views/images'));

app.use(cookieParser());

const urlencodedParser = bodyParser.urlencoded({extended: false});

const pool = mysql.createPool({
  connectionLimit: 5,
  host: "localhost",
  user: "mysql",
  database: "projectDTB",
  password: "mysql",
  multipleStatements: true
});

app.set("view engine", "hbs");

app.get("/", function(req, res){
      if (req.cookies['token']) {
        pool.query("SELECT login FROM sessionlog WHERE session_name = ? LIMIT 1", [req.cookies['token']], function(err, userdata) {
          console.log('куки токен ', req.cookies['token']);
          res.render("index.hbs", {
              users: userdata
          });
        });
      }
      else {
        res.render("index.hbs");
      }
});

app.get("/clear-cookie", function(req, res) {
    res.clearCookie('token');
    res.redirect("/");
})

app.get("/signin", function(req, res) {
    res.render("signin.hbs");
});

app.post("/signin", urlencodedParser, function(req, res) {
    if(!req.body) return res.sendStatus(400);
    const login = req.body.login;
    const pass = req.body.pass;
    pool.query("SELECT * FROM pass WHERE login = ? AND pass = ?", [login, pass], function(err, data) {
        if (err) throw err;
        if (data.length = 0) {
          console.log("Неверные логин или пароль!");
          res.redirect(req.get('referer'));
        }
        else {
          pool.query("DELETE FROM sessionlog WHERE login = ?", [login], function(err) {
            if (err) throw err;
          });
          pool.query("INSERT INTO sessionlog (session_name, login) VALUES (?, ?)", [login + pass, login], function(err, data) {
            if (err) {
              console.log("Ошибка добавления сессии");
            }
          });
          res.cookie('token', login + pass);
          res.redirect("/");
        }
    });
});

app.get("/register", function(req, res) {
    res.render("register.hbs");
});

app.post("/register", urlencodedParser, function(req, res){
    if(!req.body) return res.sendStatus(400);
    const login = req.body.login;
    const pass = req.body.pass;
      pool.query("INSERT INTO pass (login, pass) VALUES (?, ?)", [login, pass], function(err, data) {
          if(err) throw err;
          res.redirect("/");
      });
});

app.get("/items", function(req, res) {
    const id = req.query.name;
    let var1, var2;

    if (req.cookies['token']) {
      let query = "SELECT login FROM sessionlog WHERE session_name = ? LIMIT 1; SELECT name, photo, price, item_id FROM items WHERE category = ?";
      pool.query(query, [req.cookies['token'], id], function(err, results, fields) {
        if (err) throw err;
        console.log("babyka!!!", results);
        res.render("items.hbs", {
            users: results[0],
            id: results[1]
        });
      });
    }
    else {
      let query = "SELECT name, photo, price FROM items WHERE category=?";
      pool.query(query, [id], function(err, results) {
          console.log(results);
          res.render("items.hbs", {
              id: results
          });
      });
    }
});

app.post("/items", urlencodedParser, function(req, res) {
  if (req.cookies['token']) {
    const item = req.query.item;
    const amount = req.body.amount;
    pool.query("SELECT photo, name, price FROM items WHERE item_id = ?", [item], function(err, item) {
        if(err) throw err;
        pool.query("SELECT item_name, amount, finalprice FROM bin_account WHERE cookie = ? AND item_name = ?", [req.cookies['token'], item[0].name], function(err, binitem) {
            if(err) throw err;
            if (binitem.length === 0) {
                pool.query("INSERT INTO bin_account(cookie, photo, item_name, price, amount, finalprice) VALUES (?, ?, ?, ?, ?, ?) ", [req.cookies['token'], item[0].photo, item[0].name, item[0].price, amount, item[0].price * amount], function(err, added) {
                      if (err) throw err;
                      console.log("ДОБАВЛЕНО");
                      console.log(added);
                });
                res.redirect(req.get('referer'));
            }
            else {
                let finalprice = Number(binitem[0].finalprice) + Number(item[0].price * amount);
                let finalamount = Number(binitem[0].amount) + Number(amount);
                pool.query("UPDATE bin_account SET amount = ?, finalprice = ? WHERE cookie = ? AND item_name = ?", [finalamount, finalprice, req.cookies['token'], item[0].name], function(err) {
                    if(err) throw err;
                    console.log("ОБНОВЛЕНО");
                });
                res.redirect(req.get('referer'));
            }
        });
    });

  }
  else {
    console.log("Авторизируйся.")
    res.redirect(req.get('referer'));
  }
});

app.get("/bin", function(req, res) {
  if (req.cookies['token']) {
    let query = "SELECT login FROM sessionlog WHERE session_name = ? LIMIT 1; SELECT id, photo, item_name, price, amount, finalprice FROM bin_account WHERE cookie=? ORDER BY id ASC";
    pool.query(query, [req.cookies['token'], req.cookies['token']], function(err, bin, fields) {
      if(err) throw err;
      console.log(bin);
      res.render("items.hbs", {
          users: bin[0],
          bin: bin[1]
      });
    });
  }
  else {
    res.send("назад вали аноним");
  }
});

app.post("/bin", urlencodedParser, function(req, res) {
    if (req.cookies['token']) {
       const id = req.query.item;
       pool.query("DELETE FROM bin_account WHERE id=?", [id], function(err, deleted){
         if(err) throw err;
         console.log("Готово.");
         res.redirect("/bin");
       });
    }
    else {
        res.send("куда ты полез юный хакер емае");
    }
});

app.get("/buy_bin", function(req, res) {
    if (req.cookies['token']) {
       pool.query("DELETE FROM bin_account WHERE cookie = ?", [req.cookies['token']], function(err, deleted){
         if(err) throw err;
         console.log("Удалены все позиции.");
         let query = "SELECT login FROM sessionlog WHERE session_name = ? LIMIT 1; SELECT id, photo, item_name, price, amount FROM bin_account WHERE cookie=? ORDER BY id ASC";
         pool.query(query, [req.cookies['token'], req.cookies['token']], function(err, bin, fields) {
           if(err) throw err;
           console.log(bin);
           res.render("items.hbs", {
               users: bin[0],
               bin: bin[1]
           });
         });
       });
    }
    else {
        res.send("куда ты полез юный хакер емае");
    }
});

app.listen(3000, function() {
    console.log("Пора в Интернет, брат");
});
