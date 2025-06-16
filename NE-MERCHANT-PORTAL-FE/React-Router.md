**Summary** 

This document includes an example of using React Router V6

## Setup React Router

Create new browser router using **createBrowserRouter** helper from **react-router-dom**

```
    <RouterProvider router={AppRouter} />
```
### Add App Routes

An example of adding routes in **Approuter**

```
export const AppRouter = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
        errorElement: <div className="errorContainer">Error Page</div>
    }
])
```

For more information https://reactrouter.com/en/main/routers/create-browser-router