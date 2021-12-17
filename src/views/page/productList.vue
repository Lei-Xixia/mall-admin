<template>
  <div class="product-list">
    <!-- 搜索 -->
    <Search @submit="searchSubmit" :data="categoryList" />
    <a-button class="product-add-btn">
      <router-link :to="{ name: 'ProductAdd' }"> 添加商品 </router-link>
    </a-button>
    <!-- 表格 -->
    <ProductTable
      :data="tableData"
      :page="page"
      @change="changePage"
      @categoryList="categoryList"
      @edit="editProduct"
      @remove="removeProduct"
    />
  </div>
</template>

<script>
import Search from "@/components/Search.vue";
import ProductTable from "@/components/ProductTable.vue";
import api from "@/api/product.js";
import CategoryApi from "@/api/category.js";
export default {
  data() {
    return {
      tableData: [],
      searchForm: {},
      categoryList: [],
      page: {
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        total: 1,
      },
      categoryObj: {},
    };
  },
  components: {
    Search,
    ProductTable,
  },
  async created() {
    await CategoryApi.list().then((res) => {
      // console.log(res);
      this.categoryList = res.data;
      res.data.forEach((item) => {
        this.categoryObj[item.id] = item;
      });
    });
    this.getTableData();
  },
  methods: {
    // 点击搜索按钮触发的函数
    searchSubmit(form) {
      this.searchForm = form;
      this.getTableData();
    },
    getTableData() {
      api
        .list({
          page: this.page.current,
          size: this.page.pageSize,
          ...this.searchForm,
        })
        .then((res) => {
          console.log(res);
          this.page.total = res.total;
          this.tableData = res.data.map((item) => {
            return {
              ...item,
              categoryName: this.categoryObj[item.category].name,
            };
          });
        });
    },
    changePage(page) {
      this.page = page;
      this.getTableData();
    },
    editProduct(record) {
      this.$router.push({
        name: "ProductEdit",
        params: {
          id: record.id,
        },
      });
    },
    removeProduct(record) {
      this.$confirm({
        title: "确认删除",
        content: (h) => (
          <div style="color:red;">{"确定删除" + record.title + "商品吗？"}</div>
        ),
        onOk:()=> {
          api
            .remove({
              id: record.id,
            })
            .then((res) => {
              this.getTableData();
            });
        },
        onCancel() {
          console.log("Cancel");
        },
        class: "confirm-box",
      });
    },
  },
};
</script>

<style lang="less">
.product-list {
  position: relative;
  .product-add-btn {
    position: absolute;
    right: 10px;
    top: 14px;
  }
}
</style>
