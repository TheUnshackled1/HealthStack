import setuptools
from pathlib import Path
setuptools.setup(
    name="sslcommerz-lib",
    version=1.0,
    description="john's sslcommerz library for python",
    long_description=Path("README.md").read_text(),
    author="Tyrone Coronel",
    url="https://github.com/TheUnshackled1/HealthStack",
    author_email="jtcoronel.chmsu@gmail.com",
    keywords=["sslcommerz", "payment", "1.1"],
    packages=setuptools.find_packages(exclude=["tests", "data"]),
    install_requires=[
        "requests",
    ],
    classifiers=(
        'Intended Audience :: Developers',
        'Natural Language :: English',
        "Operating System :: OS Independent",
        'Programming Language :: Python',
        'Programming Language :: Python :: 2.7',
        "Programming Language :: Python :: 3.2",
        "Programming Language :: Python :: 3.3",
        "Programming Language :: Python :: 3.4",
        "Programming Language :: Python :: 3.5",
        "Topic :: Software Development :: Libraries :: Python Modules",
    ),
)
