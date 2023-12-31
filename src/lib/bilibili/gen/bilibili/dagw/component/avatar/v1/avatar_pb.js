// @generated by protoc-gen-es v1.3.1 with parameter "target=js"
// @generated from file bilibili/dagw/component/avatar/v1/avatar.proto (package bilibili.dagw.component.avatar.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { proto3 } from "@bufbuild/protobuf";
import { LayerGeneralSpec, MaskProperty, ResourceSource, SizeSpec } from "../common/common_pb.js";
import { CommentDoubleClickConfig, GyroConfig, LiveAnimeConfig } from "./plugin_pb.js";

/**
 * @generated from message bilibili.dagw.component.avatar.v1.AvatarItem
 */
export const AvatarItem = proto3.makeMessageType(
  "bilibili.dagw.component.avatar.v1.AvatarItem",
  () => [
    { no: 1, name: "container_size", kind: "message", T: SizeSpec },
    { no: 2, name: "layers", kind: "message", T: LayerGroup, repeated: true },
    { no: 3, name: "fallback_layers", kind: "message", T: LayerGroup },
    { no: 4, name: "mid", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
  ],
);

/**
 * @generated from message bilibili.dagw.component.avatar.v1.BasicLayerResource
 */
export const BasicLayerResource = proto3.makeMessageType(
  "bilibili.dagw.component.avatar.v1.BasicLayerResource",
  () => [
    { no: 1, name: "res_type", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 2, name: "res_image", kind: "message", T: ResImage, oneof: "payload" },
    { no: 3, name: "res_animation", kind: "message", T: ResAnimation, oneof: "payload" },
    { no: 4, name: "res_native_draw", kind: "message", T: ResNativeDraw, oneof: "payload" },
  ],
);

/**
 * @generated from message bilibili.dagw.component.avatar.v1.GeneralConfig
 */
export const GeneralConfig = proto3.makeMessageType(
  "bilibili.dagw.component.avatar.v1.GeneralConfig",
  () => [
    { no: 1, name: "web_css_style", kind: "map", K: 9 /* ScalarType.STRING */, V: {kind: "scalar", T: 9 /* ScalarType.STRING */} },
  ],
);

/**
 * @generated from message bilibili.dagw.component.avatar.v1.Layer
 */
export const Layer = proto3.makeMessageType(
  "bilibili.dagw.component.avatar.v1.Layer",
  () => [
    { no: 1, name: "layer_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "visible", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 3, name: "general_spec", kind: "message", T: LayerGeneralSpec },
    { no: 4, name: "layer_config", kind: "message", T: LayerConfig },
    { no: 5, name: "resource", kind: "message", T: BasicLayerResource },
  ],
);

/**
 * @generated from message bilibili.dagw.component.avatar.v1.LayerConfig
 */
export const LayerConfig = proto3.makeMessageType(
  "bilibili.dagw.component.avatar.v1.LayerConfig",
  () => [
    { no: 1, name: "tags", kind: "map", K: 9 /* ScalarType.STRING */, V: {kind: "message", T: LayerTagConfig} },
    { no: 2, name: "is_critical", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 3, name: "allow_over_paint", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 4, name: "layer_mask", kind: "message", T: MaskProperty },
  ],
);

/**
 * @generated from message bilibili.dagw.component.avatar.v1.LayerGroup
 */
export const LayerGroup = proto3.makeMessageType(
  "bilibili.dagw.component.avatar.v1.LayerGroup",
  () => [
    { no: 1, name: "group_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "layers", kind: "message", T: Layer, repeated: true },
    { no: 3, name: "group_mask", kind: "message", T: MaskProperty },
    { no: 4, name: "is_critical_group", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
  ],
);

/**
 * @generated from message bilibili.dagw.component.avatar.v1.LayerTagConfig
 */
export const LayerTagConfig = proto3.makeMessageType(
  "bilibili.dagw.component.avatar.v1.LayerTagConfig",
  () => [
    { no: 1, name: "config_type", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 2, name: "general_config", kind: "message", T: GeneralConfig, oneof: "config" },
    { no: 3, name: "gyro_config", kind: "message", T: GyroConfig, oneof: "config" },
    { no: 4, name: "comment_doubleClick_config", kind: "message", T: CommentDoubleClickConfig, oneof: "config" },
    { no: 5, name: "live_anime_config", kind: "message", T: LiveAnimeConfig, oneof: "config" },
  ],
);

/**
 * @generated from message bilibili.dagw.component.avatar.v1.ResAnimation
 */
export const ResAnimation = proto3.makeMessageType(
  "bilibili.dagw.component.avatar.v1.ResAnimation",
  () => [
    { no: 1, name: "webp_src", kind: "message", T: ResourceSource },
  ],
);

/**
 * @generated from message bilibili.dagw.component.avatar.v1.ResImage
 */
export const ResImage = proto3.makeMessageType(
  "bilibili.dagw.component.avatar.v1.ResImage",
  () => [
    { no: 1, name: "image_src", kind: "message", T: ResourceSource },
  ],
);

/**
 * @generated from message bilibili.dagw.component.avatar.v1.ResNativeDraw
 */
export const ResNativeDraw = proto3.makeMessageType(
  "bilibili.dagw.component.avatar.v1.ResNativeDraw",
  () => [
    { no: 1, name: "draw_src", kind: "message", T: ResourceSource },
  ],
);

