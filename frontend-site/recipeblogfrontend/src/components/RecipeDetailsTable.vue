<!-- <script>
    export default {
        name: "RecipeDetailsTable",
            props: {   
                item: {
                RecipeID: "",
                Title:"",
                Content:"",
                Image: "",
            }

        }
    }
</script>
<template>
    <table class="table table-striped">
        <tr>
            <td>Recipe Name</td>
            <td>{{ item.Title }}</td>
        </tr>
        <tr>
            <td>Recipe content</td>
            <td>{{ item.Content }}</td>
        </tr>
        <tr>
            <td>Recipe image</td>
            <td>{{ item.Image }}</td>
        </tr>
    </table>
</template> -->
<script>
export default {
  name: "RecipeDetailsTable",

  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<template>
  <table class="table table-striped">
    <tbody>
      <tr>
        <th>Recipe ID</th>
        <td>{{ item.RecipeID }}</td>
      </tr>

      <tr>
        <th>Title</th>
        <td>{{ item.Title }}</td>
      </tr>

      <tr>
        <th>Content</th>
        <td>{{ item.Content }}</td>
      </tr>
      <!-- image will be implemented -->
      <!-- <tr v-if="item.Image">
        <th>Image</th>
        <td>
          <img
            :src="item.Image"
            alt="Recipe image"
            style="max-width: 300px"
          />
        </td>
      </tr> -->
    </tbody>
  </table>
</template>