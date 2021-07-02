<template>
  <w-layout-default-content style="height: 2000px">
    <a-button @click="open">
      这是内容
    </a-button>
    <AModalPro
      title="water"
      :loading="modalLoading"
      loading-tip="我们在努力的加载"
      :ok-button-props="{
        loading: modalLoading,
      }"
      @register="registerModal"
      @ok="okHandle"
    >
      这里面是简单的内容
    </AModalPro>
    <a-form-pro
      :schemas="schemas"
      @submit="handleSubmit"
    />
  </w-layout-default-content>
</template>

<script lang="ts" >
import {
  defineComponent,
  ref,
} from 'vue';

import { FormPro, FormSchema, ModalPro, useModal } from '@fe6/water-pro';

import WLayoutDefaultContent from '@fe6/water-use/components/layout-default-content/LayoutDefaultContent.vue';

const schemas: FormSchema[] = [
  {
    field: 'eafield1',
    component: 'Input',
    label: '字段1',
  },
  {
    field: 'eafield2',
    component: 'Switch',
    label: '字段2',
  },
];

export default defineComponent({
  components: {
    WLayoutDefaultContent,
    AFormPro: FormPro,
    AModalPro: ModalPro,
  },
  setup() {
    const { register: registerModal, methods: modalMethods } = useModal();
    const modalLoading = ref(false);
    return {
      registerModal,
      schemas,
      open: () => {
        modalMethods.openModal();
      },
      okHandle: () => {
        modalLoading.value = true;
        setTimeout(() => {
          modalMethods.openModal(false);
          modalLoading.value = false;
        }, 1500);
      },
      modalLoading,
    };
  },
  methods: {
    handleSubmit(values: any) {
      const myValues = JSON.stringify(values);
      (this as any).$message.info(myValues === '{}' ? '操作点数据吧' : myValues);
    },
  },
});
</script>
