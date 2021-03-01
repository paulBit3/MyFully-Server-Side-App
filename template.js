/* This is a root template file which will render the HTML with React components.
This template will be rendered in the browser when the server receives a request
to the URL, and the div element with ID "root" will contains our React component */

export default () => {
    return `<!doctype html>
    <html lang="en">
     <head>
      <meta charset="utf-8">
       <title>MERN CRUD</title>
     </head>
     <body>
      <div id="root">Welcome to CRUD Web Application!</div>
      // <script src="/dist/bundle.js"></script>
     </body>
    </html>`
}