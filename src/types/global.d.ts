import { ComponentCustomProperties } from 'vue';
import * as labels from '@/labels'; // Adjust path to src/labels.ts

declare module 'vue' {
  interface ComponentCustomProperties {
    $labels: typeof labels;
  }
}