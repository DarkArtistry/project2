# The New Straits Times

![The Straits Times](https://i.giphy.com/v2xIous7mnEYg.gif)

[Start Reading](https://still-mesa-80925.herokuapp.com/)

### Inspired by Social Medias and the newspapers of Harry Potter

![HarryPotter](https://media.tenor.co/images/62938ab5278a55160335805a935a4b81/tenor.gif)

***
### Development

* Express
* Mongoose
* connect-mongo
* ejs & ejs-layouts
* bcrypt
* body-parser
* dotevn
* nodemon
* passport & passport-local
* express-session
* method-overide
* cloudinary
* multer
* masonry-layout

* ejs, jQuery, Ajax

A bit of Responsive Web Design to have everything fit onscreen regardless of browser size
index.html / style.css / script.js

***
### Workings

Step 1
![ERD](https://github.com/DarkArtistry/project2/blob/master/ERD%20DiagramV1.1.png?raw=true)

#### Note! : I learnt that should have done a Flow Diagram(2nd Step) at this point before proceeding to do the MVP

Step 2
![MVP](https://github.com/DarkArtistry/project2/blob/master/Untitled%20Diagram.png?raw=true)

Step 3

Start Project, first with connecting to the database and install express then login page!

***
### Hiccups & Techniques

#### 1. Authentication with passport

#### 2. Deep population

```  
User.findById(req.params.id).populate({
    path: 'articles',
    populate: {
      path: 'user',
      model: 'User'
    },
    populate: {
      path: 'coments',
      model: 'Coment',
      populate: {
        path: 'user',
        model: 'User'
      }
    }
  })
  ```

This made it even clearer
[Deep Population Techniques](http://frontendcollisionblog.com/mongodb/2016/01/24/mongoose-populate.html)

#### 3. Ajax

So you have to declare a script, I declared it in my layouts to call a public folder to run my script.js, where one of the on click event triggers my Ajax

```
var $bookmarkbtn = $('.bookmarkbtn')

$bookmarkbtn.on('click', function () {
  var thebutton = $(this)
  var $bookmarkid = $(this).val()
  $.ajax({
    type: 'PUT',
    // url: 'https://still-mesa-80925.herokuapp.com/bookmark.json',
    url: 'http://localhost:5000/bookmark.json',
    data: {
      articleid: $bookmarkid
    }
  }).done(function (data) {
    console.log('I am from ajax', data)

    if (thebutton.val() === data) {
      thebutton.removeClass('bm')
    } else {
      thebutton.addClass('bm')
    }

  })
})
```
```
function bookmarkJson (req, res) {
  var userArticles = req.user.articles.toString().split(',')
  var currentArticle = req.body.articleid.toString()
  var currentUser = req.user
  if (userArticles.includes(currentArticle)) {
    var index = req.user.articles.indexOf(req.body.articleid)
    currentUser.articles.splice(index, 1)
    currentUser.save(function (err, data) {
      res.json(currentArticle)
    })
  } else {
    currentUser.articles.unshift(currentArticle)
    currentUser.save(function (err, data) {
      res.json(data)
    })
  }
}
```
Which leads to the saving error I had

#### 4. Saving - By Passing Pre-save w/ my User model

```
userSchema.pre('save', function (next) {
  var user = this
  if(!user.isModified('password')) return next()
  var hash = bcrypt.hashSync(user.password, 10)
  user.password = hash
  next()
})
```

Later I learn that i could do something like this:
```
.delete((req, res) => {
  Business.findByIdAndUpdate(req.user.business, {$pull: {menu: req.body.id}}, (err, data) => {
    if (err) {
      req.flash('error', 'There was an error finding your business. Please try again.')
      return res.redirect('back')
    }
    req.flash('success', 'Your menu item was successfully removed.')
    res.redirect('/business/dashboard')
  })
})
```

#### 5. Finally The Newspaper Feel !

I was introduced to [Mansory](http://masonry.desandro.com/#install)

With this i was able to make use of his function to guide my css to have a 'jaggered' feel.

In  my ejs I will need :
* grid Div
* grid-size div
* grid-item div

Run this script in my layouts
```
<script src="https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js"></script>
```
```
var $grid = $('.grid').masonry({
  itemSelector: '.grid-item',
  percentPosition: true,
  columnWidth: '.grid-sizer'
});
// layout Isotope after each image loads
$grid.imagesLoaded().progress( function() {
  $grid.masonry();
});
})
```

### Additional things I will do

* Implement more APIs for more informations e.g finance & weather
* get socket to provide notification
* improve on my CSS for profile
* refactor my controller to have 1 model 1 controller

### Credits

* Prima
* YiSheng
* Sharona
* Jon
* Cara
* Ian
