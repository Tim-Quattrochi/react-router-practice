## What Is Routing?

Websites and traditional web applications rely on a series of HTTP request and responses, as we have already learned. For example, a user interacts with a browser to send a `GET` request to `http://somewebsite.com`, and the browser receives a response containing an HTML page, which it renders. Then, the user may click on a link on that page, and the browser sends another `GET` request, but this time to `http://somewebsite.com/dashboard`. The browser receives another HTML page as a response, and renders *that* page.

In short, traditional web applications involve different webpages being accessible through changes in the URL the requests are sent to. However, we have been using React to build **S**ingle **P**age **A**pplications (or SPAs for short), meaning that everything happens on a single HTML page through DOM manipulation. Just because we are building SPAs with React does not mean that we don't want to maintain some of the functionality that most users are accustomed to. Enter the `react-router` library.

`react-router` is the most popular routing library that can be used for React in the browser, as well as React Native. It provides components for routing within React. Since we will be using React to develop applications for web as opposed to mobile applications, we will be using the `react-router-dom` package.

The basic idea behind routing in a React application is that certain components will be accessed via a change in the URL being requested. So, for example, `http://localhost:3000` may result in a `LandingPage` component being rendered, but `http://localhost:3000/signup` may result in a `RegisterPage` component being rendered. Accomplishing this pattern with a library such as `react-router-dom` will not only maintain our Single Page functionality, but it will also allow for a more familiar experience by users.

## Getting Started

<<<<<<< HEAD
You can install `react-router-dom` into your React project with the following command:
=======
Open up the official [**React Router Quick Start Guide**](https://reactrouter.com/en/6.8.1/start/tutorial) and take a look at the 1st Example.
>>>>>>> b96b51a11ffd4e972f764bbe9d5632023015630d

```
npm install --save react-router-dom
``` 

There are four main components in the `react-router` (and by extension, the `react-router-dom`) library:
- The `BrowserRouter` component
- The `Routes` component
- The `Route` component
- The `Link` component

## BrowserRouter Component

Under the hood, `react-router-dom` uses an API built into React called `context`. We will learn more about the Context API in Module 13, but the general idea is that it allows state to be shared across multiple components without the need for prop drilling or lifting state. In order for `react-router-dom` to use the Context API to keep track of which route is being accessed (and by extension, which component to render), we must wrap our entire application in the `BrowserRouter` component provided by `react-router-dom`. See the following code snippet for an example of how to incorporate `BrowserRouter`: 

```js
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

As you can see, we simply wrap the `App` component in the `BrowserRouter` component that we imported from `react-router-dom`. The following three components rely on the BrowserRouter being initialized properly, as they require the correct information from the Context API that the BrowserRouter contains.

---

## Routes Component

The `react-router-dom` library implments routing in a manner similar to a [switch statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch) does in vanilla JavaScript; it will attempt to match the browser's current URL to a `case` in the `switch` statement, and use the result. However, `react-router-dom` provides components specifically built for single page routing. The equivalent to the `switch` statement itself is the `Routes` component, with all possible cases being children of the `Routes` components.


```js
// Correct Routes Statement
<Routes>
  {/* all possible routes will be defined here */}
</Routes>
```

Another interesting characteristic of the `Routes` component is that it ultimately serves as a sort of window where the active component is rendered. This means that any content that would remain on the page regardless of the active route could be defined around the `Routes` component. 

```js
function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* all possible routes will be defined here */}
      </Routes>
      <Footer />
    </>
  )
}
```

In the above code snippet, the App renders a `Header` component, and a `Footer` component. In between the `Header` and the `Footer` is the `Routes` component, meaning the component chosen by the Routing tree will be placed in between the header and footer on the webpage, and the header and footer will remain on the page as you navigate between routes.


---

## Route Component

If the `Routes` component is the equivalent to the `switch` statement, then we also need the equivalent to the `case` within. The `Route` component provided by `react-router-dom` is the `case`, and all possible routes be defined within the `Routes` component like so:

```js
<Routes>
  <Route path="about" element={<About />}/>
  <Route path="users" element={<Users />}/>
  <Route path="" element={<Home />}/>
</Routes>
```

Each `Route` component should have at least two props:

- `path` - the relative URL of the route being established
- `element` - the React component that should be rendered when the `path` is the current URL.

So, in the case of the above snippet, accessing `http://localhost:3000/about` will result in the `About` component being rendered. Accessing `http://localhost:3000/users` will result in the `Users` component being rendered. And accessing `http://localhost:3000` will result in the `Home` component being rendered.

> NOTE: The value provided as the `path` prop in a `Route` component should not have a leading `/`.

It is important to note that `react-router` looks through all of its Route paths to find the best mach, and move forward with that route. This means that you do not need to worry about the order of the `Route` components within the `Routes` component.


---

## Link Component

In raw HTML, you can create a hyperlink to another URL through the use of an anchor tag, like so:

```html
<a href="/some/url">Click to navigate</a>
```

By clicking on the link that results from that HTML, your browser will send a GET request to the URL in the `href` attribute. In this case, the request will be sent to whatever your host is (`localhost:3000` for local react applications) and it will add `/about` to the end: `localhost:3000/about`

However, the browser will redirect to a new page by default when sending a GET request, even if the host is the same. And each time that the browser redirects to a new page when using an SPA, the entire application is re-initialized.

Fortunately, `react-router-dom` comes with a `Link` component that recreates the same experience as an HTML `a` tag, but without breaking the Single Page flow of our application:

```js
<Link to="/some/url">Click to navigate</Link>
```

Both of the options explored here result in the same new page being rendered, but the `Link` component does so without redirecting or refreshing the page, and thus maintaining our single page functionality. The `Link` component only requires one prop: `to`. The `to` prop of the `Link` component is the equivalent to the `href` attribute of an `a` tag; its value should be the URL you wish to navigate to.

---

## Should I Change My Project Structure?

While you do not necessarily ***need*** to structure your React applications differently with this new feature, it certainly helps, and is arguably best practice. We are now creating components in one of two ways: as a piece of the page, or as an entire page (or at least the majority of a page) itself. As such, I recommend your `src` folder contain two sub-folders for your components: 
- `src/components` - contains all components that you will combine to create a single page.
- `src/pages` - contains all components that are an entire page (or at least the majority of a page).

So if your `App.js` looks like this, for example:

```js
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="" element={<LandingPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </>
  )
}
```

Your folder structure might look something like:

```
client/
├─ public/
├─ src/
│  ├─ components/
│  │  ├─ Header.js
│  │  ├─ Footer.js
│  ├─ pages/
│  │  ├─ LandingPage.js
│  │  ├─ AboutPage.js
│  │  ├─ Dashboard.js
│  ├─ App.js
│  ├─ index.js
```

> NOTE: In this scenario, any additional components used by the LandingPage, AboutPage, or Dashboard components would also be in the `components` folder.