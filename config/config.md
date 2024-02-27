
## https://docs.anthropic.com/claude/reference/ip-address-allowlisting
comando en windows:
```
New-NetFirewallRule -DisplayName "Anthropic IPv6" -Direction Outbound -LocalPort 443 -Protocol TCP -Action Allow -RemoteAddress 2607:6bc0::/48
```

