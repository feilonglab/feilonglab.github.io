const makeFaRole = (name, familyClass) => ({
  name,
  doc: `Font Awesome ${name} icon role`,
  body: {
    type: String,
    required: true,
    doc: "Icon name, optionally followed by ';' and extra CSS classes",
  },
  run(data) {
    const [iconName, extraClasses = ""] = data.body.trim().split(";", 2);

    return [
      {
        type: "span",
        class: `${familyClass} fa-${iconName.trim()} ${extraClasses}`.trim(),
        // Keep the span non-empty so it renders reliably
        children: [{ type: "text", value: "\u200b" }],
      },
    ];
  },
});

export default {
  name: "Font Awesome roles",
  roles: [
    makeFaRole("fas", "fa-solid"),
    makeFaRole("far", "fa-regular"),
    makeFaRole("fab", "fa-brands"),
  ],
};