<!-- <script>

export default {
  name: "RecipeTable",
  props: {
    items: Array
  }
}
</script>

<template>
    <table class="table table-striped">
      <thead>
        <tr>
            <th>Recipe ID</th>
            <th>Recipe Title</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.RecipeID">
          <td>{{ item.RecipeID }}</td>
          <td>
              {{ item.Title }}
          </td>
          <td>
            <router-link :to="{name:'recipe', params: {seekID}}">

            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
</template> -->
<script>
export default {
  name: "RecipeTable",
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>

<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th>Recipe ID</th>
        <th>Recipe Title</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="item in items" :key="item.RecipeID">
        <td>{{ item.RecipeID }}</td>
        <td>{{ item.Title }}</td>
        <td><router-link :to="`/recipes/${item.RecipeID}`">
              View recipe
            </router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

