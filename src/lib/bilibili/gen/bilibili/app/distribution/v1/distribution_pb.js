// @generated by protoc-gen-es v1.3.1 with parameter "target=js"
// @generated from file bilibili/app/distribution/v1/distribution.proto (package bilibili.app.distribution.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { Any, proto3 } from "@bufbuild/protobuf";

/**
 * 
 *
 * @generated from message bilibili.app.distribution.v1.GetUserPreferenceReq
 */
export const GetUserPreferenceReq = proto3.makeMessageType(
  "bilibili.app.distribution.v1.GetUserPreferenceReq",
  () => [
    { no: 1, name: "type_url", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 2, name: "extra_context", kind: "map", K: 9 /* ScalarType.STRING */, V: {kind: "scalar", T: 9 /* ScalarType.STRING */} },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.distribution.v1.GetUserPreferenceReply
 */
export const GetUserPreferenceReply = proto3.makeMessageType(
  "bilibili.app.distribution.v1.GetUserPreferenceReply",
  () => [
    { no: 1, name: "value", kind: "message", T: Any, repeated: true },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.distribution.v1.SetUserPreferenceReq
 */
export const SetUserPreferenceReq = proto3.makeMessageType(
  "bilibili.app.distribution.v1.SetUserPreferenceReq",
  () => [
    { no: 1, name: "preference", kind: "message", T: Any, repeated: true },
    { no: 2, name: "extra_context", kind: "map", K: 9 /* ScalarType.STRING */, V: {kind: "scalar", T: 9 /* ScalarType.STRING */} },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.distribution.v1.SetUserPreferenceReply
 */
export const SetUserPreferenceReply = proto3.makeMessageType(
  "bilibili.app.distribution.v1.SetUserPreferenceReply",
  [],
);

/**
 * 
 *
 * @generated from message bilibili.app.distribution.v1.UserPreferenceReq
 */
export const UserPreferenceReq = proto3.makeMessageType(
  "bilibili.app.distribution.v1.UserPreferenceReq",
  [],
);

/**
 * 云控配置下发
 *
 * @generated from message bilibili.app.distribution.v1.UserPreferenceReply
 */
export const UserPreferenceReply = proto3.makeMessageType(
  "bilibili.app.distribution.v1.UserPreferenceReply",
  () => [
    { no: 1, name: "preference", kind: "message", T: Any, repeated: true },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.distribution.v1.BoolValue
 */
export const BoolValue = proto3.makeMessageType(
  "bilibili.app.distribution.v1.BoolValue",
  () => [
    { no: 1, name: "value", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 2, name: "last_modified", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 3, name: "default_value", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 4, name: "exp", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.distribution.v1.BytesValue
 */
export const BytesValue = proto3.makeMessageType(
  "bilibili.app.distribution.v1.BytesValue",
  () => [
    { no: 1, name: "value", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 2, name: "last_modified", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 3, name: "default_value", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 4, name: "exp", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.distribution.v1.DoubleValue
 */
export const DoubleValue = proto3.makeMessageType(
  "bilibili.app.distribution.v1.DoubleValue",
  () => [
    { no: 1, name: "value", kind: "scalar", T: 1 /* ScalarType.DOUBLE */ },
    { no: 2, name: "last_modified", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 3, name: "default_value", kind: "scalar", T: 1 /* ScalarType.DOUBLE */ },
    { no: 4, name: "exp", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.distribution.v1.FloatValue
 */
export const FloatValue = proto3.makeMessageType(
  "bilibili.app.distribution.v1.FloatValue",
  () => [
    { no: 1, name: "value", kind: "scalar", T: 2 /* ScalarType.FLOAT */ },
    { no: 2, name: "last_modified", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 3, name: "default_value", kind: "scalar", T: 2 /* ScalarType.FLOAT */ },
    { no: 4, name: "exp", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.distribution.v1.Int32Value
 */
export const Int32Value = proto3.makeMessageType(
  "bilibili.app.distribution.v1.Int32Value",
  () => [
    { no: 1, name: "value", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 2, name: "last_modified", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 3, name: "default_value", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 4, name: "exp", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.distribution.v1.Int64Value
 */
export const Int64Value = proto3.makeMessageType(
  "bilibili.app.distribution.v1.Int64Value",
  () => [
    { no: 1, name: "value", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 2, name: "last_modified", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 3, name: "default_value", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 4, name: "exp", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.distribution.v1.StringValue
 */
export const StringValue = proto3.makeMessageType(
  "bilibili.app.distribution.v1.StringValue",
  () => [
    { no: 1, name: "value", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "last_modified", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 3, name: "default_value", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "exp", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.distribution.v1.UInt32Value
 */
export const UInt32Value = proto3.makeMessageType(
  "bilibili.app.distribution.v1.UInt32Value",
  () => [
    { no: 1, name: "value", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 2, name: "last_modified", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 3, name: "default_value", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 4, name: "exp", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * 
 *
 * @generated from message bilibili.app.distribution.v1.UInt64Value
 */
export const UInt64Value = proto3.makeMessageType(
  "bilibili.app.distribution.v1.UInt64Value",
  () => [
    { no: 1, name: "value", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 2, name: "last_modified", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 3, name: "default_value", kind: "scalar", T: 4 /* ScalarType.UINT64 */ },
    { no: 4, name: "exp", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

