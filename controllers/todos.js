const todosRouter = require('express').Router();
const todo = require('../models/todo');
const nodemailer = require('nodemailer');
const { PAGE_URL } = require('../config.js');
const { createHtml } = require('../utils/emailWork');
const { transporter } = require('../utils/email');



// rutas protegidaas para saber si existe y tiene acceso
todosRouter.post('/', async (request, response) =>{
    const user = request.user;
    if (!user) {
        return response.sendStatus(401);
    }

    const { text, lastname, number, email, work, price, carModel, date, idworker } = request.body;
    if(!text && !number && !lastname && !email && !work && !price && !carModel && !date && !idworker){
        return response.sendStatus(400).json({ error: 'El texto es requerido' });
    }

    // const todos = await todo.findOne({ text });

    // buscar si el contacto ya existe
    // if(todos) {
    //     return response.status(400).json({ error: 'El contacto ya existe' });
    // }

    const newTodo = new todo({
        text,
        lastname,
        number,
        email,
        work,
        price,
        carModel,
        date,
        idworker,
    });
    // console.log(newTodo);
    const savedTodo = await newTodo.save();

  user.todos = user.todos.concat(savedTodo._id);


    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: process.env.NODE_ENV === 'production'
          ? 465
          : 587,
        secure: process.env.NODE_ENV === 'production'
          ? true
          : false,
        auth: {
          user: process.env.EMAIL_USER, // generated ethereal user
          pass: process.env.EMAIL_PASS, // generated ethereal password
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER, // sender address
        to: 'ssierralta65@gmail.com', // list of receivers
        subject: 'Se ha detectad un nuevo trabajo', // Subject line
        text: 'Hola!', // plain text body
        html:`<html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <title>Simple Transactional Email</title>
          <style>
            /* -------------------------------------
                GLOBAL RESETS
            ------------------------------------- */
            
            /*All the styling goes here*/
            
            img {
              border: none;
              -ms-interpolation-mode: bicubic;
              max-width: 100%; 
            }
      
            body {
              background-color: #f6f6f6;
              font-family: sans-serif;
              -webkit-font-smoothing: antialiased;
              font-size: 14px;
              line-height: 1.4;
              margin: 0;
              padding: 0;
              -ms-text-size-adjust: 100%;
              -webkit-text-size-adjust: 100%; 
            }
      
            table {
              border-collapse: separate;
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              width: 100%; }
              table td {
                font-family: sans-serif;
                font-size: 14px;
                vertical-align: top; 
            }
      
            /* -------------------------------------
                BODY & CONTAINER
            ------------------------------------- */
      
            .body {
              background-color: #f6f6f6;
              width: 100%; 
            }
      
            /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
            .container {
              display: block;
              margin: 0 auto !important;
              /* makes it centered */
              max-width: 580px;
              padding: 10px;
              width: 580px; 
            }
      
            /* This should also be a block element, so that it will fill 100% of the .container */
            .content {
              box-sizing: border-box;
              display: block;
              margin: 0 auto;
              max-width: 580px;
              padding: 10px; 
            }
      
            /* -------------------------------------
                HEADER, FOOTER, MAIN
            ------------------------------------- */
            .main {
              background: #ffffff;
              border-radius: 3px;
              width: 100%; 
            }
      
            .wrapper {
              box-sizing: border-box;
              padding: 20px; 
            }
      
            .content-block {
              padding-bottom: 10px;
              padding-top: 10px;
            }
      
            .footer {
              clear: both;
              margin-top: 10px;
              text-align: center;
              width: 100%; 
            }
              .footer td,
              .footer p,
              .footer span,
              .footer a {
                color: #999999;
                font-size: 12px;
                text-align: center; 
            }
      
            /* -------------------------------------
                TYPOGRAPHY
            ------------------------------------- */
            h1,
            h2,
            h3,
            h4 {
              color: #000000;
              font-family: sans-serif;
              font-weight: 400;
              line-height: 1.4;
              margin: 0;
              margin-bottom: 30px; 
            }
      
            h1 {
              font-size: 35px;
              font-weight: 300;
              text-align: center;
              text-transform: capitalize; 
            }
      
            p,
            ul,
            ol {
              font-family: sans-serif;
              font-size: 14px;
              font-weight: normal;
              margin: 0;
              margin-bottom: 15px; 
            }
              p li,
              ul li,
              ol li {
                list-style-position: inside;
                margin-left: 5px; 
            }
      
            a {
              color: #3498db;
              text-decoration: underline; 
            }
      
            /* -------------------------------------
                BUTTONS
            ------------------------------------- */
            .btn {
              box-sizing: border-box;
              width: 100%; }
              .btn > tbody > tr > td {
                padding-bottom: 15px; }
              .btn table {
                width: auto; 
            }
              .btn table td {
                background-color: #ffffff;
                border-radius: 5px;
                text-align: center; 
            }
              .btn a {
                background-color: #ffffff;
                border: solid 1px #3498db;
                border-radius: 5px;
                box-sizing: border-box;
                color: #3498db;
                cursor: pointer;
                display: inline-block;
                font-size: 14px;
                font-weight: bold;
                margin: 0;
                padding: 12px 25px;
                text-decoration: none;
                text-transform: capitalize; 
            }
      
            .btn-primary table td {
              background-color: #3498db; 
            }
      
            .btn-primary a {
              background-color: #3498db;
              border-color: #3498db;
              color: #ffffff; 
            }
      
            /* -------------------------------------
                OTHER STYLES THAT MIGHT BE USEFUL
            ------------------------------------- */
            .last {
              margin-bottom: 0; 
            }
      
            .first {
              margin-top: 0; 
            }
      
            .align-center {
              text-align: center; 
            }
      
            .align-right {
              text-align: right; 
            }
      
            .align-left {
              text-align: left; 
            }
      
            .clear {
              clear: both; 
            }
      
            .mt0 {
              margin-top: 0; 
            }
      
            .mb0 {
              margin-bottom: 0; 
            }
      
            .preheader {
              color: transparent;
              display: none;
              height: 0;
              max-height: 0;
              max-width: 0;
              opacity: 0;
              overflow: hidden;
              mso-hide: all;
              visibility: hidden;
              width: 0; 
            }
      
            .powered-by a {
              text-decoration: none; 
            }
      
            hr {
              border: 0;
              border-bottom: 1px solid #f6f6f6;
              margin: 20px 0; 
            }
      
            /* -------------------------------------
                RESPONSIVE AND MOBILE FRIENDLY STYLES
            ------------------------------------- */
            @media only screen and (max-width: 620px) {
              table.body h1 {
                font-size: 28px !important;
                margin-bottom: 10px !important; 
              }
              table.body p,
              table.body ul,
              table.body ol,
              table.body td,
              table.body span,
              table.body a {
                font-size: 16px !important; 
              }
              table.body .wrapper,
              table.body .article {
                padding: 10px !important; 
              }
              table.body .content {
                padding: 0 !important; 
              }
              table.body .container {
                padding: 0 !important;
                width: 100% !important; 
              }
              table.body .main {
                border-left-width: 0 !important;
                border-radius: 0 !important;
                border-right-width: 0 !important; 
              }
              table.body .btn table {
                width: 100% !important; 
              }
              table.body .btn a {
                width: 100% !important; 
              }
              table.body .img-responsive {
                height: auto !important;
                max-width: 100% !important;
                width: auto !important; 
              }
            }
      
            /* -------------------------------------
                PRESERVE THESE STYLES IN THE HEAD
            ------------------------------------- */
            @media all {
              .ExternalClass {
                width: 100%; 
              }
              .ExternalClass,
              .ExternalClass p,
              .ExternalClass span,
              .ExternalClass font,
              .ExternalClass td,
              .ExternalClass div {
                line-height: 100%; 
              }
              .apple-link a {
                color: inherit !important;
                font-family: inherit !important;
                font-size: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
                text-decoration: none !important; 
              }
              #MessageViewBody a {
                color: inherit;
                text-decoration: none;
                font-size: inherit;
                font-family: inherit;
                font-weight: inherit;
                line-height: inherit;
              }
              .btn-primary table td:hover {
                background-color: #34495e !important; 
              }
              .btn-primary a:hover {
                background-color: #34495e !important;
                border-color: #34495e !important; 
              } 
            }
      
          </style>
        </head>
        <body>
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
            <tr>
              <td>&nbsp;</td>
              <td class="container">
                <div class="content">
      
                  <!-- START CENTERED WHITE CONTAINER -->
                  <table role="presentation" class="main">
      
                    <!-- START MAIN CONTENT AREA -->
                    <tr>
                      <td class="wrapper">
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                          <tr>
                            <td>
                              <p>Hola!!,</p>
                              <p> Hemos detectado la creación de un nuevo trabajo, haz click abajo para saber más.
                              </p>
                              <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                                <tbody>
                                  <tr>
                                    <td align="left">
                                      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                        <tbody>
                                          <tr>
                                            <td> <a href="${PAGE_URL}login" target="_blank">Click Here</a> <br>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
      
                  <!-- END MAIN CONTENT AREA -->
                  </table>
                  <!-- END CENTERED WHITE CONTAINER -->
      
                </div>
              </td>
              <td>&nbsp;</td>
            </tr>
          </table>
        </body>
      </html> `, // html body
      });

    return response.status(201).json(savedTodo)
});

// extraer las tareas de la base de datos del usuario
todosRouter.get('/', async (request, response) =>{
    const user = request.user;
    if (!user) {
        return response.sendStatus(401);
    }

    const todos = await todo.find({ user: user.id });
    console.log(todos);
    // enviar las tareas al frontend
    return response.status(200).json(todos);

});

// eliminar las tareas en la base de dato y en el frontend
todosRouter.delete('/:id', async (request, response) =>{
    const user = request.user;
    if (!user) {
        return response.sendStatus(401);
    }

    await todo.findByIdAndDelete(request.params.id);
    return response.sendStatus(204);
});

// Actualizar en la base de datos
// todosRouter.patch('/:id', async (request, response) =>{
//     const user = request.user;
//     if (!user) {
//         return response.sendStatus(401);
//     }
//     const { text, lastname, number, email, work, price, carModel, date, idworker } = request.body;

//     await todo.findByIdAndUpdate(request.params.id, { text, lastname, number, email, work, price, carModel, date, idworker });

//     return response.sendStatus(200);
// });

todosRouter.patch('/:id', async (request, response) =>{
  const user = request.user;
  if (!user) {
      return response.sendStatus(401);
  }
  const { checked } = request.body;

  const updatedwork = await todo.findByIdAndUpdate(request.params.id, { checked }, { new: true });
  const emailAdmin = createHtml(true);
  const emailUser = createHtml(false);

  await transporter.sendMail({
    from: process.env.EMAIL_USER, // sender address
        to: process.env.EMAIL_USER, // list of receivers
        subject: 'Se ha completado el trabajo', // Subject line
        html: emailAdmin
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER, // sender address
        to: updatedwork.email, // list of receivers
        subject: 'Se ha completado el trabajo', // Subject line
        html: emailUser
  });


  return response.sendStatus(200);
});

module.exports = todosRouter;

