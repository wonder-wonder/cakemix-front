// tslint:disable
/**
 * Cakemix Server API
 * Definition of Cakemix Server API
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: contact@wonder-wonder.xyz
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { AuthApi } from "./api";
import Vue from "vue"
export * from "./api";
export * from "./configuration";

export const checkAuthWithStatus = (self: Vue, statusCode: number) => {  
  if (statusCode === 401) {
    self.$store.commit("auth/logout")
    self.$router.push({ path: "/auth/login", query: { redirect: self.$route.path } })
  }
}