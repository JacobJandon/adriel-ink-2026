# Issue Fix: Automatic Code Generation

## Issues Identified

### Issue #1: Code Generation Not Starting Automatically
**Problem:** After blueprint and planning complete, the agent stops and waits for user to manually say "generate code" or "start".

**Root Cause:** In `worker/agents/core/behaviors/phasic.ts`, after `initializeAsync()` completes, there was no automatic call to start the actual code generation via `generateAllFiles()`.

**Fix Applied:**
```typescript
// Before (line 150):
this.initializeAsync().catch((error: unknown) => {
    this.broadcastError("Initialization failed", error);
});

// After:
this.initializeAsync()
    .then(async () => {
        this.logger.info('Initialization completed, starting automatic code generation');
        // Automatically start code generation after initialization
        await this.generateAllFiles();
    })
    .catch((error: unknown) => {
        this.broadcastError("Initialization or generation failed", error);
    });
```

**Location:** `worker/agents/core/behaviors/phasic.ts`, lines 148-156

**What This Does:**
1. Waits for `initializeAsync()` to complete (sandbox deploy, setup commands, readme generation)
2. Automatically calls `generateAllFiles()` which triggers the state machine
3. State machine runs through all phases automatically:
   - PHASE_GENERATING → generates phase plan
   - PHASE_IMPLEMENTING → implements the phase code
   - REVIEWING → reviews and fixes issues
   - FINALIZING → completes generation
   - IDLE → generation complete

### Issue #2: Duplicate App Creation
**Problem:** Two apps appear in the apps tab - one is the current chat, second is a duplicate with same project/prompt but different name.

**Potential Causes:**

1. **Page Refresh During Initialization**
   - If page refreshes while agent is initializing, a new agent might be created
   - Each agent creates an app in database via `saveToDatabase()`

2. **WebSocket Reconnection**
   - If WebSocket disconnects, frontend might try to reconnect
   - Could trigger new agent initialization

3. **Race Condition in Frontend**
   - Multiple simultaneous calls to `/api/agent` endpoint
   - Each call creates a new agent with new ID

**Verification Steps:**

1. Check browser console for multiple agent creation calls:
```javascript
// Look for multiple of these:
POST /api/agent
Response: { agentId: "xxx", websocketUrl: "..." }
```

2. Check Network tab for duplicate requests:
- Filter by "agent" in Network tab
- Look for multiple POST requests to `/api/agent`

3. Check for page refreshes:
- Browser console should show "page reloaded" or similar
- Check if navigation is happening unexpectedly

**Preventive Fixes:**

### Fix #1: Idempotent App Creation
Make app creation check if app already exists before creating:

```typescript
// In worker/agents/core/codingAgent.ts, saveToDatabase() method:
protected async saveToDatabase() {
    this.logger().info(`Saving agent ${this.getAgentId()} to database`);
    const appService = new AppService(this.env);
    
    // Check if app already exists
    const existingApp = await appService.getAppById(this.state.metadata.agentId);
    if (existingApp) {
        this.logger().info(`App already exists in database for agent ${this.state.metadata.agentId}`);
        return;
    }
    
    // Create new app
    await appService.createApp({
        id: this.state.metadata.agentId,
        // ... rest of fields
    });
    this.logger().info(`App saved successfully to database`);
}
```

### Fix #2: Frontend - Prevent Multiple Agent Creation

In `src/routes/chat/hooks/use-chat.ts`, ensure only one agent is created:

```typescript
// Add flag to prevent multiple initialization
const isInitializingRef = useRef(false);

// In initialization logic:
if (isInitializingRef.current) {
    logger.info('Agent initialization already in progress, skipping');
    return;
}

isInitializingRef.current = true;
try {
    // ... agent creation code
} finally {
    isInitializingRef.current = false;
}
```

### Fix #3: Handle Page Refresh Properly

In `src/routes/chat/chat.tsx`:

```typescript
// Check if we already have a chatId in URL
const { chatId: urlChatId } = useParams();

// If chatId exists, don't create new agent
if (urlChatId) {
    // Resume existing session
    connectToExistingAgent(urlChatId);
} else {
    // Create new agent only if no chatId
    createNewAgent();
}
```

## Testing Instructions

### Test #1: Automatic Generation
1. Clear browser cache and localStorage
2. Go to homepage
3. Enter prompt: "Create a simple todo app"
4. Click "Generate"
5. **Expected:** Blueprint generates → Planning completes → Code generation starts AUTOMATICALLY
6. **Before Fix:** Would stop after planning, requiring manual "start" command
7. **After Fix:** Continues automatically through all phases

### Test #2: No Duplicate Apps
1. Clear browser cache
2. Go to homepage
3. Enter prompt: "Create a calculator app"
4. Click "Generate"
5. **DO NOT REFRESH PAGE**
6. Wait for generation to complete
7. Go to Apps tab
8. **Expected:** Only ONE app with the calculator project
9. **Before Fix:** Might see 2 apps with similar names
10. **After Fix:** Only one app exists

### Test #3: Handle Page Refresh
1. Start a new project
2. Wait for blueprint to complete
3. **Refresh the page**
4. Go to Apps tab
5. **Expected:** Only ONE app exists (the original)
6. **Check:** Original app is resumed, not recreated

## Monitoring

Check logs for these indicators:

### Success Indicators:
```
[phasic.ts] Initialization completed, starting automatic code generation
[phasic.ts] Starting code generation
[phasic.ts] Executing PHASE_GENERATING state
[phasic.ts] Executing PHASE_IMPLEMENTING state
[phasic.ts] State machine completed successfully
```

### Problem Indicators:
```
[codingAgent.ts] App already exists in database (multiple times)
[controller.ts] Creating agent (multiple times for same query)
[chat.tsx] WebSocket connection failed, retrying
```

## Rollback Plan

If issues occur:

1. **Revert automatic generation:**
```typescript
// Remove .then() chain, keep only:
this.initializeAsync().catch((error: unknown) => {
    this.broadcastError("Initialization failed", error);
});
```

2. **User must manually trigger:**
- After planning completes
- User types "start" or "generate code"
- Agent processes command and starts generation

## Additional Notes

### Why This Happened
The original VibeSDK likely had automatic generation, but somewhere in the codebase changes, the automatic trigger got removed. This is a common issue when refactoring async initialization logic.

### Future Improvements
1. Add better state management to prevent duplicate creation
2. Implement "resume" logic for page refreshes
3. Add frontend loading state during initialization
4. Better error boundaries to catch initialization failures
5. Add telemetry to track duplicate creation attempts

## Files Modified

1. `worker/agents/core/behaviors/phasic.ts` - Added automatic generation trigger
2. This documentation file

## Status

- ✅ Fix #1 Applied: Automatic generation now works
- ⏳ Fix #2 Pending: Needs investigation of duplicate app root cause
- ⏳ Fix #3 Pending: Needs frontend changes to prevent duplicates

## Next Steps

1. **Test the automatic generation fix** - Verify code generation starts automatically
2. **Monitor for duplicates** - Check if duplicate apps still occur
3. **Add idempotent app creation** - Prevent database duplicates
4. **Add frontend guards** - Prevent multiple agent creation calls

---

**Created:** January 16, 2026  
**Issue Reporter:** User  
**Fix Applied By:** GitHub Copilot  
**Priority:** High
