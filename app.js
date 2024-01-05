const express = require('express');
const path = require('path');
const favicon = 'https://cdn0.iconfinder.com/data/icons/creative-business-and-development/512/email_mailing_newsletter_inbox_mail_marketing_business_letter_envelope_flat_design_icon-1024.png';
const morgan = require('morgan');



const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;

const createPath = (page) => path.resolve(__dirname, 'views', `${page}.ejs`);

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.urlencoded({extended: false}))

app.use(express.static('styles'));

app.get('/', (req, res) => {
  const title = 'Home';
  res.render(createPath('index'), { title ,favicon});
});

app.get('/contacts', (req, res) => {
  const title = 'Contacts';
  const contacts = [
    { name: 'YouTube', link: 'https://www.youtube.com/channel/UCP8Lvc3FscDlsSJEuLLqt5A' },
    { name: 'GitHub', link: 'https://github.com/MikitaRadzionau' },
  ];
  res.render(createPath('contacts'), { contacts, title ,favicon});
});

app.get('/posts/:id', (req, res) => {
  const title = 'Post';
  const post = {
    id:1,
    text:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere magnam illum ipsum minus quis maxime quidem reprehenderit eos quisquam culpa!',
    title:'Post title',
    date:'06.01.24',
    author:'Mikita',
  }
  res.render(createPath('post'), { title ,favicon,post});
});

app.get('/posts', (req, res) => {
  const title = 'Posts';
  const posts =[
    {
      id:1,
      text:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere magnam illum ipsum minus quis maxime quidem reprehenderit eos quisquam culpa!',
      title:'Post title',
      date:'06.01.24',
      author:'Mikita',
    }
  ];
  res.render(createPath('posts'), { title ,favicon,posts});
});

app.post('/add-post',(req,res)=>{
  const {title,text,author} = req.body;
  const post = {
    id:new Date(),
    date:(new Date()).toLocaleDateString(),
    title,
    text,
    author,
  }
  res.render(createPath('post'),{post,title,favicon});
})


app.get('/add-post', (req, res) => {
  const title = 'Add Post';
  res.render(createPath('add-post'), { title ,favicon});
});

app.use((req, res) => {
  const title = 'Error Page';
  res
    .status(404)
    .render(createPath('error'), { title ,favicon});
});