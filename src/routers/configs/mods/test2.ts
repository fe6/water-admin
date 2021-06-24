/** @format */

// NOTE water/use
import type { AppRouteModule } from '@@utils/use/routers/types';
import { LAYOUT_DEF, LAYOUT_BOX } from '@@utils/use/routers/constant';

const test2Page: AppRouteModule = {
  path: '/test2',
  name: 'Test2',
  component: LAYOUT_DEF,
  children: [
    {
      path: '',
      name: 'Test2',
      children: [
        {
          path: '',
          name: 'Test2View',
          meta: {
            title: '测试2',
          },
          component: () => import('@@views/Test.vue'),
        },
      ],
      component: LAYOUT_BOX,
    },
  ],
};

export default test2Page;
