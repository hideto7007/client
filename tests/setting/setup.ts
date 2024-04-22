import { config } from '@vue/test-utils';
import { createVuetify } from 'vuetify';

const vuetify = createVuetify();  // Vuetifyインスタンスを作成

// 全テストでVuetifyを利用できるように設定
config.global.plugins = [vuetify];
