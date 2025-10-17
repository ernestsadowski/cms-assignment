import {
  type DocumentOptions,
  type IntrinsicDefinitions,
  type SchemaType,
  type SchemaTypeDefinition,
} from "sanity";
import groq from "groq";

import { type TriggerVercelDeployResponse } from "../types";

import { client } from "./client";

export const makeSanityClient = (config = {}) =>
  client.withConfig({
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-12-01",
    ...config,
  });

export const triggerVercelBuild = async () => {
  const result = await makeSanityClient({ withCredentials: true }).fetch<
    TriggerVercelDeployResponse[]
  >(groq`*[_type == "vercel.deploymentTarget"]`);

  if (!(result?.length ?? 0)) {
    if (process.env.NODE_ENV !== "production") {
      return;
    }
    throw new Error("Missing deployment hook");
  }

  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.log("Triggering deployment", result);
  }

  await Promise.all(
    result.map((target) => fetch(target?.deployHook, { method: "POST" })),
  );
};

export const triggerDeployment = async () => {
  await triggerVercelBuild();
};

export const getDocumentOptions = (
  documentType:
    | IntrinsicDefinitions[keyof IntrinsicDefinitions]
    | SchemaType
    | SchemaTypeDefinition
    | undefined,
): DocumentOptions | undefined => documentType?.options as DocumentOptions | undefined;
