import type { DeploymentMode } from './ai/types';

export function getDeploymentMode(): DeploymentMode {
  if (typeof window !== 'undefined') {
    try {
      const demoMode = sessionStorage.getItem('demo_deployment_mode');
      if (demoMode === 'school' || demoMode === 'family_only') return demoMode;
    } catch (_) {}
  }
  const envMode = process.env.NEXT_PUBLIC_DEPLOYMENT_MODE;
  if (envMode === 'family_only') return 'family_only';
  return 'school';
}

export function isFamilyOnlyMode(): boolean {
  return getDeploymentMode() === 'family_only';
}

export function setDemoDeploymentMode(mode: DeploymentMode): void {
  if (typeof window !== 'undefined') {
    try { sessionStorage.setItem('demo_deployment_mode', mode); } catch (_) {}
  }
}

export function clearDemoDeploymentMode(): void {
  if (typeof window !== 'undefined') {
    try { sessionStorage.removeItem('demo_deployment_mode'); } catch (_) {}
  }
}
