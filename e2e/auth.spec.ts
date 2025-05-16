
import { test, expect } from '@playwright/test';

test('login flow', async ({ page }) => {
  await page.goto('/login');
  
  // Check initial render
  await expect(page.getByRole('heading', { name: 'Welcome back' })).toBeVisible();
  
  // Fill login form
  await page.getByLabel('Email').fill('test@example.com');
  await page.getByLabel('Password').fill('password123');
  
  // Submit form
  await page.getByRole('button', { name: 'Sign in' }).click();
  
  // Verify redirect or error state
  await expect(page.getByText('Invalid credentials')).toBeVisible();
});
