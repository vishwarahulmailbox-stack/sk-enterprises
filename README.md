# S K Enterprises Website - Cloudflare Deployment Guide

This guide provides step-by-step instructions to upload the S K Enterprises website to Cloudflare Pages.

## Pre-deployment Modifications Required

### 1. Replace Mobirise Website Builder References

**Find and replace:**
- From: `Mobirise Website Builder`
- To: `S K Enterprises`

### 2.  Replace the URL

**Find and replace:**
- From: `https://mobiri.se/2177381` To: `https://skenterprises.work/`
- mobirise.com replace with skenterprises.work
- Replace Best AI Website Maker to "S K Enterprises"
- in script.js edit last line, find innerHTML and fix it

### 3. Replace form tag section in index.html with below form

```html
    <form action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=00DgK000005ZWoX" method="POST" class="mbr-form form-with-styler" data-form-title="Form Name">
        
                    <input type=hidden name="oid" value="00DgK000005ZWoX">
                    <input type=hidden name="retURL" value="https://skenterprises.work/thank-you">

                    <div class="dragArea row">
                        <div class="col-md col-sm-12 form-group mb-3" data-for="name">
                            <input type="text" name="last_name" placeholder="Name" data-form-field="name" class="form-control" id="last_name" maxlength="80">
                        </div>
                        <div class="col-md col-sm-12 form-group mb-3" data-for="email">
                            <input type="email" name="email" placeholder="Email" data-form-field="email" class="form-control" value="" id="email" maxlength="80">
                        </div>
                        <div class="col-12 form-group mb-3" data-for="phone">
                            <input type="tel" name="phone" placeholder="Phone" data-form-field="phone" class="form-control" value="" id="phone" maxlength="20">
                        </div>
                        <div class="col-12 form-group mb-3" data-for="textarea">
                            <textarea  id="00NgK000017oQXR" name="00NgK000017oQXR" type="text" wrap="soft" data-form-field="textarea" class="form-control" placeholder="Message"></textarea>
                        </div>
                        <div class="col-lg-12 col-md-12 col-sm-12 align-center mbr-section-btn"><button type="submit" class="btn btn-primary display-7">Send message</button></div>
                    </div>
                </form>
```

### Contact Information:
- **Email:** business@skenterprises.work
- **Phone:** +91 9870 200076
- **WhatsApp:** +91 9820 801306