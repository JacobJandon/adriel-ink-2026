/**
 * Type definitions for Secrets Controller responses
 */

import type { SecretMetadata } from 'worker/services/secrets/vault-types';
import { SecretTemplate } from '../../../types/secretsTemplates';

/**
 * Response data for getSecrets
 */
export interface SecretsData {
    secrets: SecretMetadata[];
}

/**
 * Response data for storeSecret
 */
export interface SecretStoreData {
    secret: SecretMetadata;
    message: string;
}

/**
 * Response data for deleteSecret
 * Simple message response
 */
export interface SecretDeleteData {
    message: string;
}

/**
 * Response data for getTemplates
 */
export interface SecretTemplatesData {
    templates: SecretTemplate[];
}