can we add more singleton pages using the icons I've added in the import as a reference:

```js
<MaxWidthWrapper>
  <div className="space-y-4 md:space-y-8">
    {/* First Title with Looping Blur */}
    <h2 className="motion-opacity-loop motion-blur-sm-loop motion-duration-2000 text-4xl font-light leading-tight md:text-6xl">
      {content.heroSection.sectionTitle}
    </h2>

    {/* Second Title with Looping Blur and Delay */}
    <h2 className="motion-opacity-loop motion-blur-sm-loop motion-duration-2000 motion-delay-1000 text-3xl font-light leading-tight md:text-5xl">
      Your second title text here
    </h2>

    {/* Call-to-action Button with One-time Animation */}
    <div className="motion-preset-pop motion-duration-1000 mt-4">
      <CustomButton variant="dark" href="/uslugi">
        {content.heroSection.sectionCTA}
      </CustomButton>
    </div>
  </div>
</MaxWidthWrapper>
```
