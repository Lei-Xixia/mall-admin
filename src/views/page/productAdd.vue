<template>
  <div class="product-detail">
    <a-steps :current="current" class="product-step">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <BasicDetail v-if="current === 0" @next="next" :form="form"/>
      <SaleDetail v-else-if="current === 1" @next="next" @prev="prev" :form="form"/>
    </div>
  </div>
</template>

<script>
import BasicDetail from "@/components/basicDetail.vue";
import SaleDetail from "@/components/saleDetail.vue";

import api from "@/api/product.js";
export default {
  components: {
    BasicDetail,
    SaleDetail,
  },
  data() {
    return {
      current: 0,
      steps: [
        {
          title: "填写商品基本信息",
        },
        {
          title: "填写商品销售信息",
        },
      ],
      form: {
        title: "",
        desc: "",
        category: "",
        c_items: [],
        tags: [],
        price: 0,
        price_off: 0,
        unit: "",
        inventory: 0,
        images: [],
      },
    };
  },
 
  methods: {
    next(form) {
      this.form = {
        ...this.form,
        form
      }
      if(this.current === 1){
        // 提交数据
        // console.log(this.form);
        api.add(this.form).then((res) => {
          console.log(res);
          this.$message.success('新增成功');
          this.$router.push({
            name: "ProductList"
          })
        })
      } else{
        this.current++;
      }
    },
    prev() {
      this.current--;
    },
  },
};
</script>

<style lang="less">
.product-detail {
  .product-step{
    width: 50%;
    margin: 20px auto;
  }
  .steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
  }
  .steps-action {
    margin-top: 24px;
  }
}
</style>
