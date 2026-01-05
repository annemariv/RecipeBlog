import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RecipeView from "../views/RecipeView.vue";
import SingleRecipeView from "../views/SingleRecipeView.vue";
import CreateUpdateForm from "../components/CreateUpdateForm.vue";
//import RecipeView from "../views/RecipeView.vue";
// const routes = [
//   {
//     path: "/recipes",
//     name: "Recipes",
//     component: RecipeView,
//   },
// ];

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });

// export default router;

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  //added
  //GetAll
  {
    path: "/recipes",
    name: "Recipes",
    component: RecipeView,
  },
  //GetById
    {
    path: "/recipes/:RecipeID",
    name: "SingleRecipe",
    component: SingleRecipeView,
    props: true,
  },
  //Create & Update
  {
    path: '/recipe/create',
    name: 'recipe-create',
    component: CreateUpdateForm
  },
   {
  path: '/recipe/edit/:RecipeID',
  name: 'recipe-edit',
  component: CreateUpdateForm
},

  {
    path: "/about",
    name: "about",

  
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
  path: "/recipes",
  name: "recipes",
  component: () =>
    import("../views/RecipeView.vue"),
  },
  
  {
    path: "/recipes/:itemID",
    name: "recipe",
    component: ()=>
      import("../views/SingleRecipeView.vue"),
    props: route => {return{seekID: String(route.params.RecipeID)}}
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
