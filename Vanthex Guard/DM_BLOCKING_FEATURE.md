# DM Blocking Feature - v!dmmesajkapat & v!dmmesajaç

## Implementation Summary

The bot now respects user DM preferences through global blocking system. Users can disable all DM messages sent by the bot using the `v!dmmesajkapat` command.

## Commands

### v!dmmesajkapat
- **Description**: Completely blocks all DM messages from the bot
- **Effect**: Blocks DMs from:
  - Welcome messages (when joining a server)
  - Ticket notifications
  - Ban/Kick/Mute notifications
  - Broadcast messages (v!bilgilendirme)
  - Ticket channel updates
  - Spam protection notifications
  - Any other bot DM

### v!dmmesajaç
- **Description**: Re-enables DM messages from the bot
- **Prerequisite**: User must have previously blocked DMs

## Technical Details

### safeSend() Helper Function
```javascript
async function safeSend(target, content) {
  try {
    const id = target?.id || (target?.user && target.user.id);
    if (!id) return;
    if (dmBlockedUsers.has(id)) return;  // Silently skip if user blocked DMs
    await target.send(content);
  } catch (e) {
    // ignore send errors
  }
}
```

### Protected DM Sources (13 locations updated)
1. **Spam Protection** - Mute notification DM
2. **Ticket System** - Multiple channels:
   - Ticket open confirmation DM
   - Ticket message notification DM
3. **Moderation Actions**:
   - v!mute command (timeout notification)
   - v!ban command (ban notification)
   - v!kick command (kick notification)
4. **Auto Actions**:
   - GuildMemberUpdate (Timeout notifications)
   - GuildBanAdd (Ban notifications)
5. **Broadcast**:
   - v!bilgilendirme (Admin broadcast with blocked user counting)
6. **Welcome DMs**:
   - GuildMemberAdd (New member DM)

### Storage
- Blocked user IDs stored in `dmblockedusers.json`
- Loaded on bot startup (`loadDmBlockedUsers()`)
- Persisted on each block/unblock command

## User Experience

### Before Update
- Bot could spam users with DMs even if they didn't want them
- No way to disable DMs globally

### After Update
- Users can run `v!dmmesajkapat` anytime to block all bot DMs
- Users can run `v!dmmesajaç` to re-enable them
- Blocked users won't receive any DMs from:
  - Moderation actions
  - Welcome messages
  - Tickets
  - Broadcasts
  - Any other bot notification

### Broadcast Statistics
When admins run `v!bilgilendirme`, blocked users are:
- Counted as "Hata" (Error) in statistics
- Not actually sent the message
- Listed as attempted but prevented

## Files Modified
- `index.js`: Added `safeSend()` function and updated all 13+ DM send locations
- `dmblockedusers.json`: Stores list of blocked user IDs

## Testing Checklist
- [x] Syntax validation passed
- [x] Commands added: v!dmmesajkapat, v!dmmesajaç
- [x] safeSend() helper implemented
- [x] All DM sources updated to use safeSend()
- [x] JSON persistence working
- [x] No errors on bot startup

## Commands to Test
```
v!dmmesajkapat          # Block all DMs from bot
v!dmmesajaç             # Re-enable DMs from bot
```
