<template>
  <div class="custom-select" :tabindex="tabindex" @blur="open = false">
    <div
      class="selected"
      :class="{ open: open }"
      @click="
        open = !open;
        $emit('open', open);
      "
    >
      {{ selected }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="
          selected = option;
          open = false;
          $emit('input', option);
        "
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  options: string[];
  default: string | null;
  tabindex?: number;
}>();

const emit = defineEmits<{
  (e: "input", value: string | null): void;
  (e: "open", value: boolean): void;
}>();

const selected = ref<string | null>(null);

selected.value = props.default
  ? props.default
  : props.options.length > 0
    ? props.options[0]
    : null;

const open = ref<boolean>(false);

onMounted(() => {
  emit("input", selected.value);
});
</script>

<style scoped>
.custom-select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  height: 47px;
  line-height: 47px;
}

.custom-select .selected {
  background-color: #fff;
  border-radius: 6px;
  border: 1px solid #666666;
  color: #343a40;
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}

.custom-select .selected.open {
  border: 1px solid #4361ee;
  border-radius: 6px 6px 0px 0px;
}

.custom-select .selected:after {
  position: absolute;
  content: "";
  top: 22px;
  right: 1em;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-color: #fff transparent transparent transparent;
}

.custom-select .items {
  color: #343a40;
  border-radius: 0px 0px 6px 6px;
  overflow: hidden;
  border-right: 1px solid #4361ee;
  border-left: 1px solid #4361ee;
  border-bottom: 1px solid #4361ee;
  position: absolute;
  background-color: #fff;
  left: 0;
  right: 0;
  z-index: 1;
}

.custom-select .items div {
  color: #343a40;
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}

.custom-select .items div:hover {
  background-color: #e9ecef;
}

.selectHide {
  display: none;
}
</style>
