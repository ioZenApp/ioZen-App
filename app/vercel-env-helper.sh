#!/bin/bash

# Vercel Environment Variables Setup Helper
# This script displays the environment variables you need to add to Vercel
# DO NOT run this script - just use it as a reference for copy-pasting

echo "================================================"
echo "VERCEL ENVIRONMENT VARIABLES TO ADD"
echo "================================================"
echo ""
echo "Go to: https://vercel.com/[your-username]/iozen-app/settings/environment-variables"
echo ""
echo "Add each variable below:"
echo "For each one, select: Production, Preview, Development (all 3)"
echo ""
echo "================================================"
echo ""

# Load .env file
if [ -f .env ]; then
    source .env
    
    echo "1. DATABASE_URL"
    echo "   Value: $DATABASE_URL"
    echo ""
    
    echo "2. NEXT_PUBLIC_SUPABASE_URL"
    echo "   Value: $NEXT_PUBLIC_SUPABASE_URL"
    echo ""
    
    echo "3. NEXT_PUBLIC_SUPABASE_ANON_KEY"
    echo "   Value: $NEXT_PUBLIC_SUPABASE_ANON_KEY"
    echo ""
    
    echo "4. SUPABASE_SERVICE_ROLE_KEY"
    echo "   Value: $SUPABASE_SERVICE_ROLE_KEY"
    echo ""
    
    echo "5. ANTHROPIC_API_KEY"
    echo "   Value: $ANTHROPIC_API_KEY"
    echo ""
    
    echo "6. NEXT_PUBLIC_APP_URL (Production only)"
    echo "   Value: https://iozen-app.vercel.app"
    echo "   (Or your custom domain)"
    echo ""
    
    echo "7. NEXT_PUBLIC_APP_URL (Preview + Development)"
    echo "   Value: \$VERCEL_URL"
    echo "   (This is a Vercel system variable - type it exactly as shown)"
    echo ""
    
else
    echo "ERROR: .env file not found!"
    echo "Make sure you're in the /app directory"
fi

echo "================================================"
echo "After adding all variables, redeploy your project"
echo "================================================"
